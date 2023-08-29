import { connect } from "react-redux";
import classNames from "classnames";
import { BaseWithNav } from "../../components/BaseLayout";
import "./style.scss";
import { Card } from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const HomePage = (props) => {
  const { getProducts } = props;
  const [page, setPage] = useState(2);
  const [hasMore, sethasMore] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {    
    initFeeds();    
  }, [])

  const initFeeds = async (params = {}) => {
    const { page, types, priceRange } = params;

    let filterFeeder = {};
    if (!page) {
      filterFeeder.page = 1;
    }

    if (types) {
      filterFeeder.types = types;
    }

    if (priceRange) {
      filterFeeder.priceRange = priceRange;
    }
    
    await getProducts(filterFeeder)
      .then((response) => {          
        setItems(response.data.data);

        sethasMore(false);
        if(response.data.nextPage > 0) {
          sethasMore(true);
        }          
      })
      .catch((error) => {})
  }

  const fetchData = async () => {
    if(hasMore) {
      await getProducts({ page })
        .then((response) => {          
          setItems([...items, ...response.data.data]);

          sethasMore(false);
          if(response.data.nextPage > 0) {
            sethasMore(true);
          }          

          setPage(page+1)
        })
        .catch((error) => {})
    }
  }
  
  const handleFilter = async (params) => {        
    await initFeeds(params);
  }

  const loader = <div className="text-align-center">Loading ...</div>;

  return (
    <BaseWithNav onClickFilter={handleFilter}>
      <div className="section mt-3 mb-3">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={loader}
        >
          { items.length === 0 &&  
            <div className="section mt-3 mb-3">
              <div className="text-align-center not-found">Data not found</div>
            </div>        
          }
          { items.length > 0 && items.map((item, index) => {
            let typeLabel = 'card-tag-top';
            if(item.type === 'vouchers') {
              typeLabel += ' tag-primary';
            }
            else if(item.type === 'products') {
              typeLabel += ' tag-warning';
            } 
            else {
              typeLabel += ' tag-secondary';
            }

            let bannerImage = `${process.env.PUBLIC_URL}/wide-default.jpeg`;
            if(item.img) {
              bannerImage = item.img;
            }

            return(
              <Card key={index}>
                <Card.Body>
                  <div className={classNames(typeLabel)}>{ item.type }</div>
                  <LazyLoadImage 
                    width="100%" 
                    height="auto" 
                    src={bannerImage}
                    effect="blur"
                  />
                  <div className="card-description">{`Point ${item.point}`}</div>
                </Card.Body>
                <Card.Footer>{item.title}</Card.Footer>
              </Card>
            );
          })}
        </InfiniteScroll>
      </div>
    </BaseWithNav>
  );
};

const mapStateToProps = (state) => ({
  filter: state.RootStore.filter,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: dispatch.HomeStore.getProducts,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Filter = ({ 
    show, 
    onHide,     
    onClickFilter  = () => {},
}) => {
    const awardTypes = [
        {
            key: "vouchers",
            val: "vouchers",
            checked: false,
        },
        {
            key: "products",
            val: "products",
            checked: false,
        },
        {
            key: "others",
            val: "others",
            checked: false,
        },
    ];

    const priceRangeInit = {from: 10000, to: 1000000};

    const[priceRange, setPriceRange] = useState(priceRangeInit.from);
    const [checkboxes, setCheckboxes] = useState(awardTypes);
    const [checkAll, setCheckAll] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const getQueryParams = () => {
        return new URLSearchParams(location.search);
      };
    
    // useEffect(() => {
    //     const typeParams = getQueryParams().get('types').split(',')        

    //     const updatedCheckboxes = checkboxes.map((checkbox) => {
    //         let isChecked = false;
    //         if(typeParams.includes(checkbox.val)) isChecked = true;            
    //         return {...checkbox, checked: isChecked}
    //     })
    //     setCheckboxes(updatedCheckboxes)
        
    // }, [])

    const handlePriceChange = (val) => {
        setPriceRange(val);
    };    

    const handleCheckAll = (event) => {
        const isChecked = event.target.checked;
        const updatedCheckboxes = checkboxes.map((checkbox) => ({
          ...checkbox,
          checked: isChecked,
        }));

        setCheckAll(isChecked)
        setCheckboxes(updatedCheckboxes);        
    }

    const handleCheckboxChange = (checkboxId) => {
        const updatedCheckboxes = checkboxes.map((checkbox, index) =>
          index === checkboxId
            ? { ...checkbox, checked: !checkbox.checked }
            : checkbox
        );

        setCheckboxes(updatedCheckboxes);

        const checkAll = updatedCheckboxes.every(item => item.checked);
        setCheckAll(checkAll)
    };    

    const handleRemoveFilter = (type) => {
        switch (type) {
            case "prices":
                setPriceRange(priceRangeInit.from)                
                return;

            case "types":
                setCheckboxes(checkboxes.map((checkbox) => ({
                    ...checkbox,
                    checked: false,
                })))
                setCheckAll(false)
                return;
        
            default:
                setPriceRange(priceRangeInit.from)
                setCheckboxes(checkboxes.map((checkbox) => ({
                    ...checkbox,
                    checked: false,
                })))
                setCheckAll(false)

                return;
        }
    }

    const handleFilter = () => {
        let filter = {
            types: null,
            priceRange: null,
        };
        
        if (checkboxes) {
            filter.types = checkboxes.filter(item => item.checked).map((item) => item.val).join(',');
        }

        if (priceRangeInit.from !== Number(priceRange)) {
            filter.priceRange = [priceRangeInit.from, Number(priceRange)].join(',');
        }

        onHide();
        onClickFilter(filter);
    }
    
    const selectedValues = checkboxes.filter(item => item.checked).map(item => item.val).join(', ');
    const selectedPrices = priceRange > priceRangeInit.from;    

    return(
        <Modal show={show} className="modalbox" onHide={onHide} backdropClassName="modalbox-backdrop" backdrop="static" keyboard={false}>
          <Modal.Header closeButton>Filter</Modal.Header>
          <Modal.Body>
            <Form>
              <div className="filter">
                { selectedPrices && 
                    <>
                        <div>
                            <div className="chip chip-media">
                                <span className="chip-label">Poin: IDR 10000 - IDR {priceRange}</span>
                                <Button variant="link" className="chip-delete" onClick={() => handleRemoveFilter('prices')}><FontAwesomeIcon icon={faCircleXmark} /></Button>
                            </div>
                        </div>                    
                    </> 
                }

                { selectedValues.length > 0 && 
                    <>
                        <div>
                            <div className="chip chip-media">
                                <span className="chip-label">Type: {selectedValues}</span>
                                <Button variant="link" className="chip-delete" onClick={() => handleRemoveFilter('types')}><FontAwesomeIcon icon={faCircleXmark} /></Button>
                            </div>                                  
                        </div>
                    </>
                }

                { (selectedPrices || selectedValues.length > 0) && 
                    <>
                        <div>
                            <div className="chip chip-media">
                                <Button variant="link" className="chip-clear-all" onClick={() => handleRemoveFilter('all')}>Clear All</Button>
                            </div>
                        </div>                    
                    </> 
                }

              </div>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="label-range-from">{`IDR ${priceRangeInit.from}`}</Form.Label>
                <Form.Label className="label-range-to">{`IDR ${priceRange}`}</Form.Label>
                <Form.Range min={priceRangeInit.from} max={priceRangeInit.to} value={priceRange} onChange={(e) => handlePriceChange(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Award Type</Form.Label>                
                <Form.Check label="All Type" checked={checkAll} onChange={handleCheckAll} />
                {checkboxes && checkboxes.map((item, index) => {
                    return (
                        <Form.Check type="checkbox" key={index} checked={item.checked} label={item.val} value={item.val} onChange={() => handleCheckboxChange(index)} />
                    );
                })}
              </Form.Group>

              <Button variant="primary" className="btn-block" onClick={handleFilter}>Filter</Button>
            </Form>
          </Modal.Body>
        </Modal>        
    );
}
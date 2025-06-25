import { useEffect, useState } from 'react';
import {getAllProductIds, getMeasurementIds, getSampleIds} from '../services/mocked_database'
import SingleSelector from './SingleSelector'

function SampleSelector() {
    const [selectedProductId, setSelectedProductId] = useState("-");
    const [selectedSampleId, setSelectedSampleId] = useState("-");
    const [selectedMeasurementId, setSelectedMeasurementId] = useState("-");

    const [productIdList, setProductIdList] = useState(["-", ...getAllProductIds()]);
    const [sampleIdList, setSampleIdList] = useState(["-",...getSampleIds(null)]);
    const [measurementIdList, setMeasurementIdList] = useState(["-", ...getMeasurementIds(null,null)]);

    useEffect(() => {
        const samples = getSampleIds(selectedProductId === "-" ? null : selectedProductId);
        setSampleIdList(["-", ...samples]);
    }, [selectedProductId])

    useEffect(() => {
        const productId = selectedProductId === "-" ? null : selectedProductId;
        const sampleId = selectedSampleId === "-" ? null : selectedSampleId;
        setMeasurementIdList( ["-", ...getMeasurementIds(productId, sampleId)]);
    }, [selectedSampleId])
    

    return (
        <div className="flex flex-col gap-4">
            <label>Select Product:</label>
            <SingleSelector
                name="Product ID"
                choices={productIdList}
                selectedChoice={selectedProductId}
                setSelectedChoice={setSelectedProductId}/>
            <label>Select Sample:</label>
            <SingleSelector
                name="Sample ID"
                choices={sampleIdList}
                selectedChoice={selectedSampleId}
                setSelectedChoice={setSelectedSampleId}/>
            <label>Select Measurement:</label>
            <SingleSelector
                name="Measurement ID"
                choices={measurementIdList}
                selectedChoice={selectedMeasurementId}
                setSelectedChoice={setSelectedMeasurementId}/>
        </div>);
}

export default SampleSelector;
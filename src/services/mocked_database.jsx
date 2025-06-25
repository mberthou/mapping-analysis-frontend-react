import table_data from "../resources/mocked_database_data"

export function getAllProductIds(){
    return [...new Set(table_data.map(item => item.ProductId))];
}

export function getSampleIds(productId) {
    const sampleIds_predicates = item => (!productId || item.ProductId === productId);
    return [...new Set(table_data.filter( sampleIds_predicates).map( item => item.SampleId))];
}

export function getMeasurementIds(productId, sampleId) {
    const measurements_predicate = item => item.ProductId === productId && item.SampleId === sampleId;
    return [...new Set(table_data.filter(measurements_predicate).map(item => item.MeasurementId))];
}

export function getSampleData(sampleId, measurementId) {
    const sample_predicate = item => sampleId && measurementId && item.SampleId === sampleId && item.MeasurementId == measurementId;
    return table_data.find(sample_predicate)
}
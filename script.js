/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.issueAudit} trade - the trade to be processed
 * @transaction
 */
async function tradeCommodity(issueAudit) {



    issueAudit.foodBatch.owner = issueAudit.newOwner;
    
    



    let assetRegistry = await getAssetRegistry('org.example.mynetwork.foodBatch');
    await assetRegistry.update(issueAudit.foodBatch);
}
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.Certification} trade - the trade to be processed
 * @transaction
 */
async function Certification(Certification) {
    const foodBatch = Certification.foodBatch;
    if (foodBatch.certification) {
        foodBatch.certification.push(Certification);
    } else {
        foodBatch.certification = [Certification];
    }
    if (foodBatch.Remark === "Spoiled") {
        foodBatch.Remark = "Spoiled again";
    }
    else{
        if (foodBatch.Store_Temperature) {
            if (foodBatch.Store_Temperature==Certification.Temperature) {
                foodBatch.Remark = "Fresh";
            } else {
                foodBatch.Remark = "Spoiled";
            }
        } 
    

    }
    

    
    
    



    let assetRegistry = await getAssetRegistry('org.example.mynetwork.foodBatch');
    await assetRegistry.update(Certification.foodBatch);
}
/**
 * A temperature reading has been received for a shipment
 * @param {org.example.mynetwork.TemperatureReading} temperatureReading - the TemperatureReading transaction
 * @transaction
 */
async function temperatureReading(temperatureReading) {  // eslint-disable-line no-unused-vars

    const shipment = temperatureReading.shipment;

    console.log('Adding temperature ' + temperatureReading.centigrade + ' to shipment ' + shipment.$identifier);

    if (shipment.temperatureReadings) {
        shipment.temperatureReadings.push(temperatureReading);
    } else {
        shipment.temperatureReadings = [temperatureReading];
    }

    // add the temp reading to the shipment
    const shipmentRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
    await shipmentRegistry.update(shipment);
}
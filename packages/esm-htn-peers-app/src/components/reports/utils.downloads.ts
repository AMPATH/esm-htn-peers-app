import _ from "lodash";

export function generateDownloadableRefillRequest(data) {

    const sheet = [];
    
    _.each(data, (row, key) => {
        
        _.each(row.items, (item, ikey) => {

            _.each(item.items, (i, k) => {

                if(parseInt(ikey)== 0 && parseInt(k) ==0) {
                    sheet.push([row.id, row.totalDispensed, row.patientCount, item.medication, item.totalDispensed,item.patientCount, i.patientName, i.quantityDispensed, i.duration, i.durationUnits, i.dateOrdered, i.frequency]);
                } else if(parseInt(ikey) > 0 && parseInt(k) == 0) {
                    sheet.push([, , , item.medication, item.totalDispensed,item.patientCount, i.patientName, i.quantityDispensed, i.duration, i.durationUnits, i.dateOrdered, i.frequency]);
                } else {
                    sheet.push([, , , , , ,i.patientName, i.quantityDispensed, i.duration, i.durationUnits, i.dateOrdered, i.frequency]);
                }  
            })
        });
    });

    const download = sheet.map((row) => {
        return {
            peer: row[0],
            Cumulative_Pills_Requested:row[1],
            No_Patients_Using:row[2],
            Medication:row[3],
            Medication_Total:row[4],
            Patients_on_this_Med:row[5],
            Patient_Name:row[6],
            Quantity_Dispensed:row[7],
            Duration:row[8],
            Duration_Units:row[9],
            Date_Ordered:row[10],
            Frequency:row[11]
        }
    });

    
    return download;
}

export function generateDownloadablePillCountReport(data) {

    let sheet = [];

    const zero_pills: Array<any> = _.get(data, 'Adherent');
    const non_zero_pills: Array<any> = _.get(data, 'Non-Adherent');

    const zeroPillCount = _.orderBy(mapMeds(_.groupBy(zero_pills.map((i, k) => { i.id = `${k}`; return i;}), 'medication')), ['totalRemaining'], ['desc']);
    const nonZeroPillCount = _.orderBy(mapMeds(_.groupBy(non_zero_pills.map((i, k) => { i.id = `${k}`; return i;}), 'medication')), ['totalRemaining'], ['desc']);
   
    const empty_row = { medication: null, totalDelivered: null, totalRemaining: null, patientCount: null, 
        patientName: null, pillsDelivered:null, pillCount: null, encounterDate:null};

    let zero_pills_title = {...empty_row};
    zero_pills_title.medication =  `Participants with 0 pills remaining (${zero_pills.length})`;

    let non_zero_pills_title = {...empty_row};
    non_zero_pills_title.medication = `Participants with >0 pills remaining (${non_zero_pills.length})`;

    sheet.push(empty_row);
    sheet.push(zero_pills_title);
    sheet.push(empty_row);

    sheet = sheet.concat(mapPillCount(zeroPillCount));

    sheet.push(empty_row);
    sheet.push(non_zero_pills_title);
    sheet.push(empty_row);

    sheet = sheet.concat(mapPillCount(nonZeroPillCount));

    return sheet;
}

export function generateDownloadablePillDeliveryReport(data) {

    let sheet = [];

    const tabYes = _.find(data, a => a.id=='TAB-YES');
    const tabNo = _.find(data, a => a.id=='TAB-NO');
    
    const failedDeliveries = _.orderBy(tabNo.items, ['peer'], ['asc']);
    const successDeliveries = _.orderBy(tabYes.items, ['peer'], ['asc']);
   
    const empty_row = { peer: null, patientCount: null, patientName: null, encounterDate:null, deliveryStatus:null};

    let failedDeliveriesTitle = {...empty_row};
    failedDeliveriesTitle.peer =  `Failed Deliveries (${tabNo.patientCount})`;

    let successDeliveriesTitle = {...empty_row};
    successDeliveriesTitle.peer = `Successfull Deliveries (${tabYes.patientCount})`;

    sheet.push(empty_row);
    sheet.push(failedDeliveriesTitle);
    sheet.push(empty_row);

    sheet = sheet.concat(mapMedicationDelivery(failedDeliveries));

    sheet.push(empty_row);
    sheet.push(successDeliveriesTitle);
    sheet.push(empty_row);

    sheet = sheet.concat(mapMedicationDelivery(successDeliveries));
    
    return sheet;
}

export function generateDownloadableMissedMedsReport(data) {

    let sheet = [];
    _.each(data, (row, key) => {
        
        _.each(row.patients, (item, ikey) => {
            
            if(parseInt(ikey) == 0) {
                sheet.push({ 
                    missedDoseReason: row.missedDoseReason, 
                    scale: translateScale(row.scale), 
                    patientCount: row.patientCount, 
                    patientName: item.patientName, 
                    medication: item.medication, 
                    encounterDate:item.encounterDate
                });
            } else {
                sheet.push({
                    missedDoseReason: null, 
                    scale: null, 
                    patientCount: null, 
                    patientName: item.patientName, 
                    medication: item.medication, 
                    encounterDate:item.encounterDate
                });
            } 

        });
    });
    
    return sheet;
}

function mapMeds(oMeds) {

    return _.values(_.mapValues(oMeds, (o: Array<any>,key) => {
        return {
            id: `${key}`,
            medication: _.trim(_.first(o).medication),
            totalDelivered: _.sumBy(o, 'pillsDelivered'),
            totalRemaining: _.sumBy(o, 'pillCount'),
            items: o,
            patientCount: o.length
        };
    }));
}

function mapPillCount(data: Array<any>) {
    
    let sheet = [];

    _.each(data, (row, key) => {
        
        _.each(row.items, (item, ikey) => {
            
            if(parseInt(ikey) == 0) {
                sheet.push({
                    medication: row.medication, 
                    totalDelivered: row.totalDelivered, 
                    totalRemaining: row.totalRemaining, 
                    patientCount: row.patientCount, 
                    patientName: item.patientName, 
                    pillsDelivered: item.pillsDelivered, 
                    pillCount: item.pillCount,
                    encounterDate: item.encounterDate
                });
            } else {
                sheet.push({
                    medication: null, 
                    totalDelivered: null, 
                    totalRemaining: null, 
                    patientCount: null, 
                    patientName: item.patientName, 
                    pillsDelivered: item.pillsDelivered, 
                    pillCount: item.pillCount,
                    encounterDate: item.encounterDate
                });
            } 

        });
    });

    return sheet;
}

function mapMedicationDelivery(data) {
    let sheet = [];

    _.each(data, (row, key) => {
        
        _.each(row.items, (item, ikey) => {
            
            if(parseInt(ikey) == 0) {
                sheet.push( { 
                    peer: row.peer, 
                    patientCount: row.patientCount, 
                    patientName: item.patientName, 
                    encounterDate:item.encounterDate, 
                    deliveryStatus:item.deliveryStatus
                });
            } else {
                sheet.push( { 
                    peer: null, 
                    patientCount: null, 
                    patientName: item.patientName, 
                    encounterDate:item.encounterDate, 
                    deliveryStatus:item.deliveryStatus
                });
            } 

        });
    });

    return sheet;
}

function translateScale(scale) {
    const scaleMap = {
      'ONE': 1,
      'TWO': 2,
      'THREE': 3,
      'FOUR': 4,
      'FIVE': 5
    };

    return _.get(scaleMap, scale);
  }
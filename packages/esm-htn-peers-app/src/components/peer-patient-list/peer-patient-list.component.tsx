import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  InlineLoading,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  Tile,
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, fetchCurrentPatient, formatDate, useConfig, useLayoutType, useSessionUser } from '@openmrs/esm-framework';

import { useRelationships } from './relationships.resource';
import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import styles from './peer-patient-list.scss';
import { mapPatienInfo, mergePatienInfo } from '../../services/patient.service';
import PatientInfoSummary from './patient-info-summary';
import { getPatientEncounter, getPatientInfo, getPatientOrders } from '../../api/patient-resource';

interface peerPatientRow {
  id: string;
  idNumber: string;
  location: string;
  name: string;
  patientUuid: string;
  phone: string;
  drugDeliveryDate: string;
}

const PeerPatientList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';

  const sessionUser = useSessionUser();
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [patientOrders, setPatientOrders] = useState(null);

  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  const { data: relationships, isLoading } = useRelationships(user?.user?.person?.uuid);

  const reflect = (promise) => {
    return promise.then((v) => v.data.results, (e) => e);
  };

  useMemo(() => {
    const abortController = new AbortController();
    
    if(relationships && !patientData) {
      const patientUuids = [];
      relationships.forEach((patient) => {
        patientUuids.push(patient.relativeUuid);
      });
      
      const patientInfoRequest = getPatientInfo(patientUuids, abortController);
      const patientOrdersRequest = getPatientOrders(patientUuids, abortController, 'ACTIVE');
      const patientEncounterRequest = getPatientEncounter(patientUuids, 'BIGPICTELECARE', abortController);
  
      Promise.all(patientInfoRequest).then((patientInfo) => {
        const mappedInfo = mapPatienInfo(patientInfo);
        setPatientData(mappedInfo);
        return mappedInfo;
      }).then((mappedInfo) => {
        // not the best way to handle this but can suffice for now
        Promise.all(patientOrdersRequest.concat(patientEncounterRequest)).then((encounterDrugOrders) => {
          const mergedInfo = mergePatienInfo(mappedInfo, encounterDrugOrders);
          setPatientData(mergedInfo);
          setPatientOrders(mergedInfo);
          setOrdersLoading(false);
        });
      });
    }

  }, [relationships, patientData]);
  console.log(patientData);
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('patientName', 'Name'),
        key: 'name',
      },
      {
        id: 1,
        header: t('location', 'Location'),
        key: 'location',
      },
      {
        id: 2,
        header: t('phone', 'Phone'),
        key: 'phone',
      },
      {
        id: 3,
        header: t('rtcDate', 'Next Visit Date'),
        key: 'rtcDate',
      }
    ],
    [t],
  );

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (patientData?.length) {
    return (
      <div className={styles.peerPatientsContainer}>
        <div className={styles.peerPatientsDetailHeaderContainer}>
          <h4 className={styles.productiveHeading02}>{t('peerPatients', 'Peer Patients')}</h4>
        </div>
        <DataTable rows={patientData} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
            <TableContainer title="" className={styles.tableContainer}>
              <Table className={styles.peerPatientsTable} {...getTableProps()} size={desktopView ? 'short' : 'normal'}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableExpandRow {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'name' ? (
                              <ConfigurableLink
                                to={`\${openmrsSpaBase}/patient/${patientData?.[index]?.uuid}/chart/`}
                              >
                                {cell.value}
                              </ConfigurableLink>
                            ) : (cell.value)}
                            {cell.info.header === 'rtcDate' ? (
                              formatDate(new Date(patientData?.[index]?.encounter?.return_visit_date[0]?.value))
                            ) : (null)}
                          </TableCell>
                        ))}
                      </TableExpandRow>
                      {row.isExpanded ? (
                          <TableExpandedRow className={styles.expandedRow} style={{ paddingLeft: isTablet ? '4rem' : '3rem' }} colSpan={headers.length + 2}
                          >
                            {
                              ordersLoading? (
                                <span>
                                  <InlineLoading />
                                </span>
                              ) : (
                                <PatientInfoSummary patientInfo={patientOrders?.[index].orders} />
                                )
                            }
                          </TableExpandedRow>
                        ) : (null)}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              {rows.length === 0 && (
                <p
                  style={{ height: desktopView ? '2rem' : '3rem', marginLeft: desktopView ? '2rem' : '3rem' }}
                  className={`${styles.emptyRow} ${styles.bodyLong01}`}
                >
                  {t('noPatientsFound', 'No patients found')}
                </p>
              )}
            </TableContainer>
          )}
        </DataTable>
      </div>
    );
  }

  return (
    <div className={styles.peerPatientsContainer}>
      <Tile light className={styles.tile}>
        <div className={!desktopView ? styles.tabletHeading : styles.desktopHeading}>
          <h4>{t('peerPatients', 'Peer Patients')}</h4>
        </div>
        <EmptyIllustration />
        <p className={styles.content}>{t('noPeerPatients', 'You have not been assigned any peer patients.')}</p>
      </Tile>
    </div>
  );
};


export default PeerPatientList;

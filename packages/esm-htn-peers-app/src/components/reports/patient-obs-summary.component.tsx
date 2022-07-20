import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableContainer, TableExpandHeader, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { ConfigurableLink, formatDate, useLayoutType } from '@openmrs/esm-framework';

import { uniqBy } from 'lodash';

import styles from './patient-medications.component.scss'

interface PatientObsSummaryProps {
  obs: Array<any>
}

const PatientObsSummary: React.FC<PatientObsSummaryProps> = ({ obs }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
    const desktopView = layout === 'desktop';
    const isTablet = layout === 'tablet';

  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('patientName', 'Patient Name'),
        key: 'patientName',
      },
      {
        id: 1,
        header: t('encounterType', 'Encounter Type'),
        key: 'encounterType',
      },
      {
        id: 2,
        header: t('encounterDate', 'Date of Encounter'),
        key: 'encounterDate',
      },
      {
        id: 3,
        header: t('deliveryStatus', 'Delivery Status'),
        key: 'deliveryStatus',
      }
    ],
    [t],
  );
  

  if (!obs) {
    return <DataTableSkeleton role="progressbar" />;
  }

  return (
    <div className={''}>
      <DataTable
            rows={obs}
            headers={headerData}
            render={({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
              <TableContainer title="" className={styles.tableContainer}>
                

                <Table 
                  className={styles.peerPatientsTable}
                  {...getTableProps()}
                  size={desktopView ? 'short' : 'normal'}
                >
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      
                        <TableRow {...getRowProps({ row })}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>
                              {
                              
                              cell.info.header === 'patientName' ? (
                                <ConfigurableLink
                                  to={`\${openmrsSpaBase}/patient/${obs?.[index]?.uuid}/chart/`}
                                >
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (
                                cell.info.header === 'encounterDate' && obs?.[index]?.encounterDate
                                ? formatDate(new Date(obs?.[index]?.encounterDate))
                                : cell.value
                              )}
                              
                            </TableCell>
                          ))}
                        </TableRow>
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
          />
    </div>
  );
};

export default PatientObsSummary;

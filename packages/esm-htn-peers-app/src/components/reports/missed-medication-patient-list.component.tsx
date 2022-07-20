import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableContainer, TableExpandHeader, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { ConfigurableLink, formatDate, useLayoutType } from '@openmrs/esm-framework';

import { uniqBy } from 'lodash';

import styles from './patient-medications.component.scss'

interface MissedMedicationPatientListProps {
  patients: Array<{
    id: string;
    uuid: string;
    patientName: string;
    medication: string;
    encounterDate: string;
  }>
}

const MissedMedicationPatientList: React.FC<MissedMedicationPatientListProps> = ({ patients }) => {
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
        header: t('medication', 'Missed Medication'),
        key: 'medication',
      },
      {
        id: 2,
        header: t('encounterDate', 'Date of Encounter'),
        key: 'encounterDate',
      }
    ],
    [t],
  );
  

  if (!patients) {
    return <DataTableSkeleton role="progressbar" />;
  }

  return (
    <div className={''}>
      <DataTable
            rows={patients}
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
                                  to={`\${openmrsSpaBase}/patient/${patients?.[index]?.uuid}/chart/`}
                                >
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (
                                cell.info.header === 'encounterDate' && patients?.[index]?.encounterDate
                                ? formatDate(new Date(patients?.[index]?.encounterDate))
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

export default MissedMedicationPatientList;

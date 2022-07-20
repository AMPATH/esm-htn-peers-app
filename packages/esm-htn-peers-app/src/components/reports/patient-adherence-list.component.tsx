import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { ConfigurableLink, formatDate, useLayoutType } from '@openmrs/esm-framework';

import styles from './patient-medications.component.scss'

interface PatientAdherenceListProps {
  patientList: Array<{
    adherence: string;
    countDone: string;
    encounterDate: string;
    id: string;
    medication: string;
    patientName: string;
    patientUuid: string;
    pillCount: number;
    pillsDelivered: number;

  }>
}

const PatientAdherenceList: React.FC<PatientAdherenceListProps> = ({ patientList }) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
    const desktopView = layout === 'desktop';

  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('patientName', 'Patient Name'),
        key: 'patientName',
      },
      {
        id: 1,
        header: t('pillsDelivered', 'Pills Delivered'),
        key: 'pillsDelivered',
      },
      {
        id: 2,
        header: t('pillCount', 'Pills Remaining'),
        key: 'pillCount',
      },
      {
        id: 3,
        header: t('encounterDate', 'Encounter Date'),
        key: 'encounterDate',
      }
    ],
    [t],
  );

  if (!patientList) {
    return <DataTableSkeleton role="progressbar" />;
  }

  return (
    <div className={''}>
      <DataTable
            rows={patientList}
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
                                  to={`\${openmrsSpaBase}/patient/${patientList?.[index]?.patientUuid}/chart/`}
                                >
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (
                                cell.info.header === 'encounterDate' && patientList?.[index]?.encounterDate
                                ? formatDate(new Date(patientList?.[index]?.encounterDate))
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

export default PatientAdherenceList;

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableContainer, TableExpandHeader, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { ConfigurableLink, formatDate, useLayoutType } from '@openmrs/esm-framework';


import styles from './patient-medications.component.scss'

interface PatientMedicationProps {
  medicationData: Array<any>
}

const PatientMedicationSummary: React.FC<PatientMedicationProps> = ({ medicationData }) => {
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
        header: t('quantityDispensed', 'Quantity Dispensed'),
        key: 'quantityDispensed',
      },
      {
        id: 2,
        header: t('duration', 'Duration'),
        key: 'duration',
      },
      {
        id: 3,
        header: t('durationUnits', 'Duration Units'),
        key: 'durationUnits',
      },
      {
        id: 4,
        header: t('dateOrdered', 'Date Ordered'),
        key: 'dateOrdered',
      },
      {
        id: 5,
        header: t('frequency', 'Frequency'),
        key: 'frequency',
      }
    ],
    [t],
  );
  

  if (!medicationData) {
    return <DataTableSkeleton role="progressbar" />;
  }

  return (
    <div className={''}>
      <DataTable
            rows={medicationData}
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
                                  to={`\${openmrsSpaBase}/patient/${medicationData?.[index]?.patientUuid}/chart/`}
                                >
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (
                                cell.info.header === 'dateOrdered' && medicationData?.[index]?.dateOrdered
                                ? formatDate(new Date(medicationData?.[index]?.dateOrdered))
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

export default PatientMedicationSummary;

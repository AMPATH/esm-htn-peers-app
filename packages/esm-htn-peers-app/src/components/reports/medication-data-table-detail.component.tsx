import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableContainer, TableExpandedRow, TableExpandHeader, TableExpandRow, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { formatDate, useLayoutType } from '@openmrs/esm-framework';

import styles from './data-table.component.scss';
import PatientMedicationSummary from './patient-medications.component';

interface MedicationDataTableDetailProps {
  data: Array<{
    id: string,
    totalDispensed: number, 
    patientCount: number, 
    items: Array<any>, 
    medication: string
  }>
}

const MedicationDataTableDetail: React.FC<MedicationDataTableDetailProps> = ({ data }) => {

  const { t } = useTranslation();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';

  console.log("data", data);
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('medicationRequested', 'Medication'),
        key: 'medication',
      },
      {
        id: 2,
        header: t('totalDispensed', 'Total Requested'),
        key: 'totalDispensed',
      },
      {
        id: 3,
        header: t('patientCount', 'No. Patients Using'),
        key: 'patientCount',
      }
    ],
    [t],
  );

  return (
    <DataTable
    rows={data}
    headers={headerData}
    isSortable
    render={({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
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
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                {row.isExpanded ? (
                  <TableExpandedRow
                    className={styles.expandedRow}
                    style={{ paddingLeft: isTablet ? '4rem' : '3rem' }}
                    colSpan={headers.length + 2}
                  >
                    <PatientMedicationSummary medicationData={data[index].items}  />
                  </TableExpandedRow>
                ) : null}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <p
            style={{ height: desktopView ? '2rem' : '3rem', marginLeft: desktopView ? '2rem' : '3rem' }}
            className={`${styles.emptyRow} ${styles.bodyLong01}`}
          >
            {t('noRecordsFound', 'No medications found')}
          </p>
        )}
      </TableContainer>
    )}
  />
  );
};

export default MedicationDataTableDetail;

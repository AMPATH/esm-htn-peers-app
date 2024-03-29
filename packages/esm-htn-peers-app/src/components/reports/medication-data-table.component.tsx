import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableBody, TableCell, TableContainer, TableExpandedRow, TableExpandHeader, TableExpandRow, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useLayoutType } from '@openmrs/esm-framework';

import styles from './data-table.component.scss';
import MedicationDataTableDetail from './medication-data-table-detail.component';

interface MedicationDataTableProps {
  data: Array<{
    id: string,
    totalDispensed: number, 
    patientCount: number, 
    items: Array<any>, 
    peer: string
  }>,
  medInfo: Array<any>
}

const MedicationDataTable: React.FC<MedicationDataTableProps> = ({ data, medInfo }) => {

  const { t } = useTranslation();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';

  const [downloadableData, SetDownloadableData] = useState([]);

  useEffect(() => {
    SetDownloadableData(downloadableData);
  }, [data]);
  
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('peer', 'Peer'),
        key: 'peer',
      },
      {
        id: 2,
        header: t('totalDispensed', 'Cumulative Total Requested'),
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
                    <MedicationDataTableDetail data={data[index].items}  />
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

export default MedicationDataTable;

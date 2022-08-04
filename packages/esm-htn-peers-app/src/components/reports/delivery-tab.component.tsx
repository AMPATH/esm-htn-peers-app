import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableBody, TableCell, TableContainer, TableExpandedRow, TableExpandHeader, TableExpandRow, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useLayoutType } from '@openmrs/esm-framework';

import styles from './data-table.component.scss';
import PatientObsSummary from './patient-obs-summary.component';
import _ from 'lodash';

interface DeliveryTabProps {
  data: Array<any>
}

const DeliveryTab: React.FC<DeliveryTabProps> = ({ data }) => {
    const { t } = useTranslation();
    const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';
  const [dData, SetdData] = useState([]);

  useMemo(() => {
    SetdData(_.orderBy(data, ['peer'], ['asc']));
  }, [data]);
  
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('peer', 'Peer Name'),
        key: 'peer',
      },
      {
        id: 2,
        header: t('patientCount', 'No. Patients'),
        key: 'patientCount',
      }
    ],
    [t],
  );

    return (
<DataTable
    rows={dData}
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
                    <PatientObsSummary obs={dData[index].items}  />
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
            {t('noRecordsFound', 'No delivery information found')}
          </p>
        )}
      </TableContainer>
    )}
  />);
};

export default DeliveryTab;
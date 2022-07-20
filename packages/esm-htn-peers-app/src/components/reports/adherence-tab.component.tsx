import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableBody, TableCell, TableContainer, TableExpandedRow, TableExpandHeader, TableExpandRow, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { useLayoutType } from '@openmrs/esm-framework';

import styles from './data-table.component.scss';
import _, { first, groupBy, mapValues, sumBy, trim, values } from 'lodash';
import PatientAdherenceList from './patient-adherence-list.component';

interface AdherenceTabProps {
  data: Array<any>
}

const AdherenceTab: React.FC<AdherenceTabProps> = ({ data }) => {
    const { t } = useTranslation();
    const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';
  const [dData, SetdData] = useState([]);

  useMemo(() => {

    const byMedication = groupBy(data.map((i, k) => { i.id = `${k}`; return i;}), 'medication');
    
    SetdData(_.orderBy(mapMeds(byMedication), ['totalRemaining'], ['desc']));

  }, [data]);
  
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('medication', 'Medication'),
        key: 'medication',
      },
      {
        id: 1,
        header: t('totalDelivered', 'Total Pills Delivered'),
        key: 'totalDelivered',
      },
      {
        id: 2,
        header: t('totalRemaining', 'Total Pills Remaining'),
        key: 'totalRemaining',
      },
      {
        id: 3,
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
                    <PatientAdherenceList patientList={dData[index].items}  />
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
            {t('noRecordsFound', 'No adherence information found')}
          </p>
        )}
      </TableContainer>
    )}
  />);
};

function mapMeds(oMeds) {

    return values(mapValues(oMeds, (o: Array<any>,key) => {
        return {
            id: `${key}`,
            medication: trim(first(o).medication),
            totalDelivered: sumBy(o, 'pillsDelivered'),
            totalRemaining: sumBy(o, 'pillCount'),
            items: o,
            patientCount: o.length
        };
    }));
}

export default AdherenceTab;
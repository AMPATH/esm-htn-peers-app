import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableBody, TableCell, TableContainer, TableExpandedRow, TableExpandHeader, TableExpandRow, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { ConfigurableLink, useLayoutType } from '@openmrs/esm-framework';

import styles from './data-table.component.scss';
import _, { first, groupBy, mapValues, sumBy, trim, values } from 'lodash';
import PatientAdherenceList from './patient-adherence-list.component';

interface AdherenceTabByPatientProps {
  data: Array<any>
}

const AdherenceTabByPatient: React.FC<AdherenceTabByPatientProps> = ({ data }) => {
    const { t } = useTranslation();
    const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';
  const [dData, SetdData] = useState([]);

  useMemo(() => {

    const byPatient = groupBy(data.map((i, k) => { i.id = `${k}`; return i;}), 'patientUuid');
    
    SetdData(_.orderBy(mapMeds(byPatient), ['nEncounters'], ['desc']));

  }, [data]);
  
  const headerData = useMemo(
    () => [
      {
        id: 0,
        header: t('patientNameClean', 'Patient'),
        key: 'patientNameClean',
      },
      {
        id: 1,
        header: t('peer', 'Peer'),
        key: 'peer',
      },
      {
        id: 2,
        header: t('nEncounters', 'No. Enncounters'),
        key: 'nEncounters',
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
                      {
                              cell.info.header === 'patientNameClean' ? (
                                <ConfigurableLink
                                  to={`\${openmrsSpaBase}/patient/${dData?.[index]?.patientUuid}/chart/`}
                                >
                                  {cell.value}
                                </ConfigurableLink>
                              ) : (cell.value)
                              }
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
            patientNameClean: _.startCase(_.toLower(trim(first(o).patientName).split(" - ")[1])),
            peer: first(o).peer,
            items: o,
            patientUuid: key,
            nEncounters: _.uniqBy(o, 'encounterDate').length
        };
    }));
}

export default AdherenceTabByPatient;
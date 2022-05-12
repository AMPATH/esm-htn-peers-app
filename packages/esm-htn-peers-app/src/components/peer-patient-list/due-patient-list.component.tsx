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
  ToggleSmall,
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, formatDate, useLayoutType } from '@openmrs/esm-framework';

import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import styles from './peer-patient-list.scss';
import PatientInfoSummary from './patient-info-summary';

export interface DuePeerPatientListItem {
    id: string;
    name: string;
    location?: string;
    phone?: string;
    rtcDate?: string;
    [anythingElse: string]: any;
}

export interface DuePeerPatientListProps {
    items: Array<DuePeerPatientListItem>;
    isLoading: boolean;
    peerId: string;
}

const DuePeerPatientList: React.FC<DuePeerPatientListProps> = ({items, isLoading, peerId}) => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';
  const isTablet = layout === 'tablet';

  const [showFake, setShowFake] = useState(false);
  const toggleFake = useCallback((isFake) => (isFake && !showFake)? "hidden fake" : "", [showFake])
  
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

  if (items?.length) {
    return (
      <div className={styles.peerPatientsContainer}>
        <div className={styles.peerPatientsDetailHeaderContainer}>
          <h4 className={styles.productiveHeading02}>{t('duePeerPatients', 'Peer patients due for delivery within the next 7 days')}</h4>
        </div>
        <DataTable rows={items} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
            <TableContainer title="" className={styles.tableContainer}>
              <TableToolbar>
                <TableToolbarContent>
                <ToggleSmall
                  id={"showFake-due-"+peerId}
                  aria-label={t('showFake', 'Show Fake Patients')}
                  labelText={t('showFake', 'Show Test Patients')}
                  toggled={showFake}
                  onChange={() => {} /* Required by the typings, but we don't need it. */}
                  onToggle={(value) => setShowFake(value)
                  }
                />
                </TableToolbarContent>
              </TableToolbar>
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
                      <TableExpandRow {...getRowProps({ row })} className={toggleFake(items?.[index]?.isFake)}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'name' ? (
                              <ConfigurableLink
                                to={`\${openmrsSpaBase}/patient/${items?.[index]?.uuid}/chart/`}
                              >
                                {cell.value}
                              </ConfigurableLink>
                            ) : (cell.value)}
                            {cell.info.header === 'rtcDate' && items?.[index]?.encounter ? (
                              formatDate(new Date(items?.[index]?.encounter?.return_visit_date[0]?.value))
                            ) : (null)}
                          </TableCell>
                        ))}
                      </TableExpandRow>
                      {row.isExpanded ? (
                          <TableExpandedRow className={styles.expandedRow} style={{ paddingLeft: isTablet ? '4rem' : '3rem' }} 
                          colSpan={headers.length + 2}>
                           <PatientInfoSummary patientUuid={items?.[index]?.uuid} />
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
        <p className={styles.content}>{t('noDuePeerPatients', 'You have no peer patients who are due for delivery for the next week.')}</p>
      </Tile>
    </div>
  );
};


export default DuePeerPatientList;

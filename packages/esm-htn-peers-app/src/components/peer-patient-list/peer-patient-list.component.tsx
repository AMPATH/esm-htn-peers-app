import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  Tile,
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, useConfig, useLayoutType, useSessionUser } from '@openmrs/esm-framework';

import { useRelationships } from './relationships.resource';
import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import styles from './peer-patient-list.scss';

interface peerPatientRow {
  id: string;
  idNumber: string;
  location: string;
  name: string;
  patientUuid: string;
  phone: string;
  drugDeliveryDate: string;
}

const PeerPatientList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';

  const sessionUser = useSessionUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  const { data: relationships, isLoading } = useRelationships(user?.user?.person?.uuid);

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
        header: t('drugDeliveryDate', 'Drug Delivery Date'),
        key: 'drugDeliveryDate',
      },
    ],
    [t],
  );

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (relationships?.length) {
    return (
      <div className={styles.peerPatientsContainer}>
        <div className={styles.peerPatientsDetailHeaderContainer}>
          <h4 className={styles.productiveHeading02}>{t('peerPatients', 'Peer Patients')}</h4>
        </div>
        <DataTable rows={relationships} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps, getBatchActionProps, getRowProps }) => (
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
                            {cell.info.header === 'name' ? (
                              <ConfigurableLink
                                to={`\${openmrsSpaBase}/patient/${relationships?.[index]?.relativeUuid}/chart/`}
                              >
                                {cell.value}
                              </ConfigurableLink>
                            ) : (
                              cell.value + '--' + cell.info.header
                            )}
                          </TableCell>
                        ))}
                      </TableExpandRow>
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
        <p className={styles.content}>{t('noPeerPatients', 'You have not been assigned any peer patients.')}</p>
      </Tile>
    </div>
  );
};

export default PeerPatientList;

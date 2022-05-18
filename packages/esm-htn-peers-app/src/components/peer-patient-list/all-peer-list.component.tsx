/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { DataTableSkeleton, Tile, Accordion, AccordionItem } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { OpenmrsResource, useLayoutType } from '@openmrs/esm-framework';

import { EmptyIllustration } from '../../ui-components/empty-illustration.component';
import styles from './peer-patient-list.scss';
import PeerPatientList from './peer-patient-list.component';
import { getPeers } from '../../api/patient-resource';
import { first } from 'lodash';
import { PEER_PROVIDER_IDS } from '../../peers';

const AllPeerPatientList: React.FC = () => {
  const { t } = useTranslation();
  const layout = useLayoutType();
  const desktopView = layout === 'desktop';

  const [peers, setPeers] = useState<Array<any>>(null);
  const [peersLoading, setPeersLoading] = useState(true);
  const [toggledItem, setToggledItem] = useState<Array<boolean>>([]);

  useEffect(() => {
    const accordionItems = Array.from({ length: PEER_PROVIDER_IDS.length }, (i) => (i = false));
    // open the first accordion
    accordionItems[0] = true;
    setToggledItem(accordionItems);

    const abortController = new AbortController();

    const peerRequest = getPeers(abortController);
    if (!peers) {
      Promise.all(peerRequest).then((peerInfo: Array<OpenmrsResource>) => {
        const mappedPeers = peerInfo.map((peer) => first(peer?.data.results));
        setPeersLoading(false);
        setPeers(mappedPeers);
      });
    }
  }, [peersLoading]);

  if (peersLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (peers?.length) {
    return (
      <div className={styles.peerPatientsContainer}>
        <Accordion>
          {peers.map((peer, index) => (
            <AccordionItem key={index} open={toggledItem[index]} title={<h4>Peer: {peer.display}</h4>}>
              <PeerPatientList user={peer} />
            </AccordionItem>
          ))}
        </Accordion>
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
        <p className={styles.content}>{t('noDuePeerPatients', 'You have no peer patients who are assigned to you.')}</p>
      </Tile>
    </div>
  );
};

const toggleAccordions = (accordions) => {
  const _items = [...accordions];
  let openIndex = 0;
  accordions.forEach((item, index) => {
    // close the current
    if (item == true) {
      _items[index] = false;
      openIndex = index + 1;
      // open the next
      if (openIndex < PEER_PROVIDER_IDS.length) _items[openIndex] = true;
    }
  });
  return _items;
};

export default AllPeerPatientList;

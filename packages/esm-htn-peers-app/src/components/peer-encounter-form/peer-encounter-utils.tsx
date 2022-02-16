import { navigate } from '@openmrs/esm-framework';


export function scrollIntoView(viewId: string) {
  document.getElementById(viewId).scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}

export function cancelSubmission() {
  navigate({ to: `${window.spaBase}/home` });
}
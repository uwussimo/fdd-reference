import { MobilkassaAdapter } from './adapters/mobilkassa';
import { MultikassaAdapter } from './adapters/multikassa';
import { QposAdapter } from './adapters/qpos';

export const resolveAdapter = (workstation: Record<string, unknown>) => {
  if (workstation.isMultikassa) {
    return new MultikassaAdapter();
  }

  if (workstation.isMobilkassa) {
    return new MobilkassaAdapter();
  }

  if (workstation.isQpos) {
    return new QposAdapter();
  }

  return null;
};

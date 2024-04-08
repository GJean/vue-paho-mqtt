import { utilClientWss } from '~/../setupTests';
import { createClient } from '~/config/client';
import { defaultMqttOptions } from '~/config/constants';
import * as UTILS from '~/utils';
import {getMqttOptions, setMqttOptions} from '~/config/options';

const isBroker = import.meta.env.MODE === 'broker';

describe.runIf(isBroker)('auth utils', () => {
  test('if status is set right before connection', () => {
    expect(UTILS.status()).toBe('disconnected');
  });
  describe('Client', () => {
    setMqttOptions(utilClientWss);
    createClient(getMqttOptions());
    it('if host set correctly', () => {
      expect(UTILS.host()).toBe(utilClientWss.host);
    });
    it('if port set correctly', () => {
      expect(UTILS.port()).toBe(utilClientWss.port);
    });
    it('if useSSL set correctly', () => {
      expect(UTILS.useSSL()).toBe(utilClientWss.useSSL);
    });
    it('if clientId set correctly', () => {
      expect(UTILS.clientId()).toBe(utilClientWss.clientId);
    });
  });
  it(`if connects to the broker in ${defaultMqttOptions.watchdogTimeout}ms `, async () => {
    await expect(UTILS.connectClient()).resolves.toBe(true);
  });

  it.fails(
    `if fails to connect to the broker in ${defaultMqttOptions.watchdogTimeout}ms `,
    async () => await expect(UTILS.connectClient()).rejects.toBe(true),
  );
});

import { utilClientAuth } from '~/../setupTests';
import { createClient } from '~/config/client';
import { defaultMqttOptions } from '~/config/constants';
import * as UTILS from '~/utils';

describe.runIf(process.env.NODE_ENV === 'broker')('auth utils', () => {
  test('if status is set right before connection', () => {
    expect(UTILS.status()).toBe('disconnected');
  });
  describe('Client', () => {
    createClient(utilClientAuth);
    test('if host set correctly', () => {
      expect(UTILS.host()).toBe(utilClientAuth.host);
    });
    test('if port set correctly', () => {
      expect(UTILS.port()).toBe(utilClientAuth.port);
    });
    test('if username set correctly', () => {
      expect(UTILS.username()).toBe(utilClientAuth.username);
    });
    test('if password set correctly', () => {
      expect(UTILS.password()).toBe(utilClientAuth.password);
    });
    test('if clientId set correctly', () => {
      expect(UTILS.clientId()).toBe(utilClientAuth.clientId);
    });
  });
  test(`if connects to the broker in ${defaultMqttOptions.watchdogTimeout}ms `, async () => {
    await expect(UTILS.connectClient()).resolves.toBe(true);
  });

  test.fails(
    `if fails to connect to the broker in ${defaultMqttOptions.watchdogTimeout}ms `,
    async () => await expect(UTILS.connectClient()).rejects.toBe(true),
  );
});

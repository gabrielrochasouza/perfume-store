// Brazilian PIX QR Code generator (EMV / BR Code specification)

function crc16(str: string): string {
  let crc = 0xffff;
  for (const char of str) {
    crc ^= char.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`;
}

export function generatePix({
  key,
  name,
  city,
  amount,
  txid = '***',
}: {
  key: string;
  name: string;
  city: string;
  amount?: number;
  txid?: string;
}): string {
  const merchantAccount =
    tlv('00', 'br.gov.bcb.pix') +
    tlv('01', key);

  const payload =
    tlv('00', '01') +
    tlv('26', merchantAccount) +
    tlv('52', '0000') +
    tlv('53', '986') +
    (amount !== undefined ? tlv('54', amount.toFixed(2)) : '') +
    tlv('58', 'BR') +
    tlv('59', name.slice(0, 25)) +
    tlv('60', city.slice(0, 15)) +
    tlv('62', tlv('05', txid.slice(0, 25))) +
    '6304';

  return payload + crc16(payload);
}

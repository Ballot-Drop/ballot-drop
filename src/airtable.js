import Airtable from 'airtable';
import { AIRTABLE_API_KEY, AIRTABLE_BASE } from '@/config';

export function airtable() {
  const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);

  return base;
}

export function getTable(tableName) {
  return airtable()(tableName);
}

#!/usr/bin/env node
import { apiGet, apiPost, apiDelete, encId, runTest } from './test-utils.mjs';

const DIR = import.meta.dirname;

await runTest('infoflow', DIR, async (ctx) => {
  let s = ctx.step('Create information flow diagram');
  let diagramId;
  try {
    const res = await apiPost('/api/infoflow/diagrams', { name: 'Test InfoFlow' });
    diagramId = res.data._id;
    s.pass();
  } catch (e) { s.fail(e.message); throw e; }

  s = ctx.step('Create information item (Order)');
  let item1Id;
  try {
    const res = await apiPost('/api/infoflow/info-items', { diagramId, name: 'Order', x1: 50, y1: 100, x2: 180, y2: 160 });
    item1Id = res.data._id;
    s.pass();
  } catch (e) { s.fail(e.message); throw e; }

  s = ctx.step('Create information item (Invoice)');
  let item2Id;
  try {
    const res = await apiPost('/api/infoflow/info-items', { diagramId, name: 'Invoice', x1: 350, y1: 100, x2: 480, y2: 160 });
    item2Id = res.data._id;
    s.pass();
  } catch (e) { s.fail(e.message); throw e; }

  s = ctx.step('Create information flow');
  try {
    await apiPost('/api/infoflow/information-flows', { diagramId, sourceId: item1Id, targetId: item2Id, name: 'generates' });
    s.pass();
  } catch (e) { s.fail(e.message); throw e; }

  await ctx.layoutDiagram(diagramId);
  await ctx.exportDiagram(diagramId, 'Export infoflow image');

  s = ctx.step('Delete diagram');
  try {
    await apiDelete(`/api/infoflow/diagrams/${encId(diagramId)}`);
    s.pass();
  } catch (e) { s.fail(e.message); throw e; }
});

# mct
MCT Dev
```bash
[4.0K Apr  2 18:42]  .
├── [4.0K Apr  2 18:36]  docs
│   └── [4.0K Apr  2 18:36]  src
│       ├── [4.0K Apr  2 18:36]  guide
│       │   └── [4.7K Apr  2 18:42]  security.md
│       ├── [4.0K Apr  2 18:36]  process
│       │   ├── [4.0K Apr  2 18:36]  testing
│       │   │   └── [6.7K Apr  2 18:42]  plan.md
│       │   ├── [8.4K Apr  2 18:42]  cycle.md
│       │   ├── [ 413 Apr  2 18:42]  index.md
│       │   └── [7.2K Apr  2 18:42]  version.md
│       └── [1.1K Apr  2 18:42]  index.md
├── [4.0K Apr  2 18:36]  e2e
│   ├── [4.0K Apr  2 18:36]  helper
│   │   ├── [1.5K Apr  2 18:42]  addInitExampleFaultProvider.js
│   │   ├── [1.5K Apr  2 18:42]  addInitExampleFaultProviderStatic.js
│   │   ├── [1.4K Apr  2 18:42]  addInitExampleUser.js
│   │   ├── [1.5K Apr  2 18:42]  addInitFaultManagementPlugin.js
│   │   ├── [2.1K Apr  2 18:42]  addInitFileInputObject.js
│   │   ├── [1.6K Apr  2 18:42]  addInitNotebookWithUrls.js
│   │   ├── [1.4K Apr  2 18:42]  addInitOperatorStatus.js
│   │   ├── [1.5K Apr  2 18:42]  addInitRestrictedNotebook.js
│   │   ├── [ 831 Apr  2 18:42]  addNoneditableObject.js
│   │   ├── [8.0K Apr  2 18:42]  faultUtils.js
│   │   ├── [2.5K Apr  2 18:42]  notebookUtils.js
│   │   ├── [4.5K Apr  2 18:42]  planningUtils.js
│   │   └── [1.5K Apr  2 18:42]  useSnowTheme.js
│   ├── [4.0K Apr  2 18:36]  test-data
│   │   ├── [4.0K Apr  2 18:36]  examplePlans
│   │   │   ├── [ 31K Apr  2 18:42]  ExamplePlan_Large.json
│   │   │   ├── [1.0K Apr  2 18:42]  ExamplePlan_Small1.json
│   │   │   └── [ 873 Apr  2 18:42]  ExamplePlan_Small2.json
│   │   ├── [ 67K Apr  2 18:42]  ExampleLayouts.json
│   │   ├── [1.9K Apr  2 18:42]  PerformanceDisplayLayout.json
│   │   ├── [1.6K Apr  2 18:42]  PerformanceNotebook.json
│   │   ├── [4.6K Apr  2 18:42]  recycled_local_storage.json
│   │   ├── [ 10K Apr  2 18:42]  rick.jpg
│   │   └── [1.6K Apr  2 18:42]  VisualTestData_storage.json
│   ├── [4.0K Apr  2 18:36]  tests
│   │   ├── [4.0K Apr  2 18:36]  framework
│   │   │   ├── [7.1K Apr  2 18:42]  appActions.e2e.spec.js
│   │   │   ├── [2.4K Apr  2 18:42]  baseFixtures.e2e.spec.js
│   │   │   ├── [6.3K Apr  2 18:42]  exampleTemplate.e2e.spec.js
│   │   │   ├── [2.8K Apr  2 18:42]  generateVisualTestData.e2e.spec.js
│   │   │   ├── [2.0K Apr  2 18:42]  pluginFixtures.e2e.spec.js
│   │   │   └── [1.7K Apr  2 18:42]  testData.e2e.spec.js
│   │   ├── [4.0K Apr  2 18:36]  functional
│   │   │   ├── [4.0K Apr  2 18:36]  example
│   │   │   │   ├── [4.0K Apr  2 18:36]  generator
│   │   │   │   │   └── [5.9K Apr  2 18:42]  sineWaveLimitProvider.e2e.spec.js
│   │   │   │   └── [2.6K Apr  2 18:42]  eventGenerator.e2e.spec.js
│   │   │   ├── [4.0K Apr  2 18:36]  planning
│   │   │   │   ├── [4.3K Apr  2 18:42]  ganttChart.e2e.spec.js
│   │   │   │   ├── [1.8K Apr  2 18:42]  plan.e2e.spec.js
│   │   │   │   └── [8.0K Apr  2 18:42]  timestrip.e2e.spec.js
│   │   │   ├── [4.0K Apr  2 18:36]  plugins
│   │   │   │   ├── [4.0K Apr  2 18:36]  clocks
│   │   │   │   │   ├── [2.9K Apr  2 18:42]  clock.e2e.spec.js
│   │   │   │   │   └── [2.0K Apr  2 18:42]  remoteClock.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  conditionSet
│   │   │   │   │   └── [ 16K Apr  2 18:42]  conditionSet.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  displayLayout
│   │   │   │   │   └── [ 10K Apr  2 18:42]  displayLayout.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  faultManagement
│   │   │   │   │   └── [ 11K Apr  2 18:42]  faultManagement.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  flexibleLayout
│   │   │   │   │   └── [7.3K Apr  2 18:42]  flexibleLayout.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  gauge
│   │   │   │   │   └── [5.8K Apr  2 18:42]  gauge.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  imagery
│   │   │   │   │   └── [ 34K Apr  2 18:42]  exampleImagery.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  importAndExportAsJSON
│   │   │   │   │   ├── [2.4K Apr  2 18:42]  exportAsJson.e2e.spec.js
│   │   │   │   │   └── [2.4K Apr  2 18:42]  importAsJson.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  lad
│   │   │   │   │   └── [ 11K Apr  2 18:42]  lad.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  notebook
│   │   │   │   │   ├── [ 18K Apr  2 18:42]  notebook.e2e.spec.js
│   │   │   │   │   ├── [7.2K Apr  2 18:42]  notebookSnapshots.e2e.spec.js
│   │   │   │   │   ├── [ 15K Apr  2 18:42]  notebookWithCouchDB.e2e.spec.js
│   │   │   │   │   ├── [8.9K Apr  2 18:42]  restrictedNotebook.e2e.spec.js
│   │   │   │   │   └── [ 14K Apr  2 18:42]  tags.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  operatorStatus
│   │   │   │   │   └── [7.0K Apr  2 18:42]  operatorStatus.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  plot
│   │   │   │   │   ├── [4.0K Apr  2 18:36]  autoscale.e2e.spec.js-snapshots
│   │   │   │   │   │   ├── [ 19K Apr  2 18:42]  autoscale-canvas-panned-chrome-darwin
│   │   │   │   │   │   ├── [ 19K Apr  2 18:42]  autoscale-canvas-panned-chrome-darwin.png
│   │   │   │   │   │   ├── [ 17K Apr  2 18:42]  autoscale-canvas-panned-chrome-linux.png
│   │   │   │   │   │   ├── [ 21K Apr  2 18:42]  autoscale-canvas-prepan-chrome-darwin
│   │   │   │   │   │   ├── [ 19K Apr  2 18:42]  autoscale-canvas-prepan-chrome-darwin.png
│   │   │   │   │   │   └── [ 19K Apr  2 18:42]  autoscale-canvas-prepan-chrome-linux.png
│   │   │   │   │   ├── [7.4K Apr  2 18:42]  autoscale.e2e.spec.js
│   │   │   │   │   ├── [ 11K Apr  2 18:42]  logPlot.e2e.spec.js
│   │   │   │   │   ├── [5.9K Apr  2 18:42]  missingPlotObj.e2e.spec.js
│   │   │   │   │   ├── [ 12K Apr  2 18:42]  overlayPlot.e2e.spec.js
│   │   │   │   │   ├── [4.6K Apr  2 18:42]  plotLegendSwatch.e2e.spec.js
│   │   │   │   │   ├── [5.8K Apr  2 18:42]  plotRendering.e2e.spec.js
│   │   │   │   │   ├── [4.4K Apr  2 18:42]  scatterPlot.e2e.spec.js
│   │   │   │   │   ├── [10.0K Apr  2 18:42]  stackedPlot.e2e.spec.js
│   │   │   │   │   └── [9.5K Apr  2 18:42]  tagging.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  telemetryTable
│   │   │   │   │   └── [3.3K Apr  2 18:42]  telemetryTable.e2e.spec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  timeConductor
│   │   │   │   │   └── [7.7K Apr  2 18:42]  timeConductor.e2e.spec.js
│   │   │   │   └── [4.0K Apr  2 18:36]  timer
│   │   │   │       └── [5.5K Apr  2 18:42]  timer.e2e.spec.js
│   │   │   ├── [3.0K Apr  2 18:42]  branding.e2e.spec.js
│   │   │   ├── [4.5K Apr  2 18:42]  couchdb.e2e.spec.js
│   │   │   ├── [ 12K Apr  2 18:42]  forms.e2e.spec.js
│   │   │   ├── [2.2K Apr  2 18:42]  menu.e2e.spec.js
│   │   │   ├── [ 12K Apr  2 18:42]  moveAndLinkObjects.e2e.spec.js
│   │   │   ├── [4.9K Apr  2 18:42]  notification.e2e.spec.js
│   │   │   ├── [ 12K Apr  2 18:42]  recentObjects.e2e.spec.js
│   │   │   ├── [ 11K Apr  2 18:42]  search.e2e.spec.js
│   │   │   ├── [2.7K Apr  2 18:42]  smoke.e2e.spec.js
│   │   │   └── [8.0K Apr  2 18:42]  tree.e2e.spec.js
│   │   ├── [4.0K Apr  2 18:36]  performance
│   │   │   ├── [8.3K Apr  2 18:42]  imagery.perf.spec.js
│   │   │   ├── [5.2K Apr  2 18:42]  memleak-imagery.perf.spec.js
│   │   │   └── [7.6K Apr  2 18:42]  notebook.perf.spec.js
│   │   └── [4.0K Apr  2 18:36]  visual
│   │       ├── [4.0K Apr  2 18:36]  components
│   │       │   └── [4.0K Apr  2 18:42]  tree.visual.spec.js
│   │       ├── [2.8K Apr  2 18:42]  addInit.visual.spec.js
│   │       ├── [2.5K Apr  2 18:42]  controlledClock.visual.spec.js
│   │       ├── [7.4K Apr  2 18:42]  default.visual.spec.js
│   │       ├── [3.4K Apr  2 18:42]  faultManagement.visual.spec.js
│   │       ├── [2.3K Apr  2 18:42]  notebook.visual.spec.js
│   │       ├── [3.2K Apr  2 18:42]  notification.visual.spec.js
│   │       ├── [2.4K Apr  2 18:42]  plan.visual.spec.js
│   │       └── [4.0K Apr  2 18:42]  search.visual.spec.js
│   ├── [ 15K Apr  2 18:42]  appActions.js
│   ├── [6.9K Apr  2 18:42]  baseFixtures.js
│   ├── [2.5K Apr  2 18:42]  playwright-ci.config.js
│   ├── [3.0K Apr  2 18:42]  playwright-local.config.js
│   ├── [1.1K Apr  2 18:42]  playwright-performance.config.js
│   ├── [1.7K Apr  2 18:42]  playwright-visual.config.js
│   ├── [5.9K Apr  2 18:42]  pluginFixtures.js
│   └── [ 25K Apr  2 18:42]  README.md
├── [4.0K Apr  2 18:36]  example
│   ├── [4.0K Apr  2 18:36]  eventGenerator
│   │   ├── [2.3K Apr  2 18:42]  EventMetadataProvider.js
│   │   ├── [3.3K Apr  2 18:42]  EventTelemetryProvider.js
│   │   ├── [2.0K Apr  2 18:42]  plugin.js
│   │   ├── [2.9K Apr  2 18:42]  pluginSpec.js
│   │   └── [2.1K Apr  2 18:42]  transcript.json
│   ├── [4.0K Apr  2 18:36]  exampleTags
│   │   ├── [1.8K Apr  2 18:42]  plugin.js
│   │   └── [ 552 Apr  2 18:42]  tags.json
│   ├── [4.0K Apr  2 18:36]  exampleUser
│   │   ├── [1.5K Apr  2 18:42]  exampleUserCreator.js
│   │   ├── [6.2K Apr  2 18:42]  ExampleUserProvider.js
│   │   ├── [1.7K Apr  2 18:42]  plugin.js
│   │   └── [1.9K Apr  2 18:42]  pluginSpec.js
│   ├── [4.0K Apr  2 18:36]  faultManagement
│   │   ├── [2.4K Apr  2 18:42]  exampleFaultSource.js
│   │   ├── [1.7K Apr  2 18:42]  pluginSpec.js
│   │   └── [1.9K Apr  2 18:42]  utils.js
│   ├── [4.0K Apr  2 18:36]  generator
│   │   ├── [4.1K Apr  2 18:42]  GeneratorMetadataProvider.js
│   │   ├── [3.6K Apr  2 18:42]  GeneratorProvider.js
│   │   ├── [7.3K Apr  2 18:42]  generatorWorker.js
│   │   ├── [6.2K Apr  2 18:42]  plugin.js
│   │   ├── [5.3K Apr  2 18:42]  SinewaveLimitProvider.js
│   │   ├── [4.8K Apr  2 18:42]  SinewaveStalenessProvider.js
│   │   ├── [2.9K Apr  2 18:42]  StateGeneratorProvider.js
│   │   └── [3.6K Apr  2 18:42]  WorkerInterface.js
│   ├── [4.0K Apr  2 18:36]  imagery
│   │   └── [ 11K Apr  2 18:42]  plugin.js
│   ├── [4.0K Apr  2 18:36]  simpleVuePlugin
│   │   ├── [ 224 Apr  2 18:42]  HelloWorld.vue
│   │   └── [1.0K Apr  2 18:42]  plugin.js
│   └── [ 127 Apr  2 18:42]  README.md
├── [4.0K Apr  2 18:36]  new
│   └── [4.0K Apr  2 18:36]  new
│       └── [4.0K Apr  2 18:36]  node_modules
│           └── [4.0K Apr  2 18:36]  iconv-lite
├── [4.0K Apr  2 18:36]  old
│   ├── [ 51K Apr  2 18:42]  API.md
│   ├── [ 17K Apr  2 18:42]  CONTRIBUTING.md
│   ├── [1005 Apr  2 18:42]  copyright-notice.html
│   ├── [1.2K Apr  2 18:42]  copyright-notice.js
│   ├── [ 725 Apr  2 18:42]  LICENSE.md
│   ├── [9.9K Apr  2 18:42]  README.md
│   └── [1.5K Apr  2 18:42]  SECURITY.md
├── [4.0K Apr  2 18:36]  src
│   ├── [4.0K Apr  2 18:36]  api
│   │   ├── [4.0K Apr  2 18:36]  actions
│   │   │   ├── [5.4K Apr  2 18:42]  ActionCollection.js
│   │   │   ├── [8.0K Apr  2 18:42]  ActionCollectionSpec.js
│   │   │   ├── [4.9K Apr  2 18:42]  ActionsAPI.js
│   │   │   └── [5.5K Apr  2 18:42]  ActionsAPISpec.js
│   │   ├── [4.0K Apr  2 18:36]  annotation
│   │   │   ├── [ 16K Apr  2 18:42]  AnnotationAPI.js
│   │   │   └── [ 12K Apr  2 18:42]  AnnotationAPISpec.js
│   │   ├── [4.0K Apr  2 18:36]  composition
│   │   │   ├── [4.9K Apr  2 18:42]  CompositionAPI.js
│   │   │   ├── [ 11K Apr  2 18:42]  CompositionAPISpec.js
│   │   │   ├── [ 11K Apr  2 18:42]  CompositionCollection.js
│   │   │   ├── [8.7K Apr  2 18:42]  CompositionProvider.js
│   │   │   └── [8.4K Apr  2 18:42]  DefaultCompositionProvider.js
│   │   ├── [4.0K Apr  2 18:36]  faultmanagement
│   │   │   ├── [3.5K Apr  2 18:42]  FaultManagementAPI.js
│   │   │   └── [4.8K Apr  2 18:42]  FaultManagementAPISpec.js
│   │   ├── [4.0K Apr  2 18:36]  forms
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [4.0K Apr  2 18:36]  controls
│   │   │   │   │   ├── [8.8K Apr  2 18:42]  AutoCompleteField.vue
│   │   │   │   │   ├── [1.7K Apr  2 18:42]  CheckBoxField.vue
│   │   │   │   │   ├── [2.0K Apr  2 18:42]  ClockDisplayFormatField.vue
│   │   │   │   │   ├── [2.2K Apr  2 18:42]  CompositeItem.vue
│   │   │   │   │   ├── [1.9K Apr  2 18:42]  Composite.vue
│   │   │   │   │   ├── [4.9K Apr  2 18:42]  Datetime.vue
│   │   │   │   │   ├── [4.3K Apr  2 18:42]  FileInput.vue
│   │   │   │   │   ├── [1.8K Apr  2 18:42]  Locator.vue
│   │   │   │   │   ├── [2.1K Apr  2 18:42]  NumberField.vue
│   │   │   │   │   ├── [2.0K Apr  2 18:42]  SelectField.vue
│   │   │   │   │   ├── [2.0K Apr  2 18:42]  TextAreaField.vue
│   │   │   │   │   ├── [2.0K Apr  2 18:42]  TextField.vue
│   │   │   │   │   └── [1.9K Apr  2 18:42]  ToggleSwitchField.vue
│   │   │   │   ├── [5.0K Apr  2 18:42]  FormProperties.vue
│   │   │   │   └── [4.0K Apr  2 18:42]  FormRow.vue
│   │   │   ├── [3.1K Apr  2 18:42]  FormController.js
│   │   │   ├── [7.2K Apr  2 18:42]  FormsAPI.js
│   │   │   ├── [5.4K Apr  2 18:42]  FormsAPISpec.js
│   │   │   └── [ 365 Apr  2 18:42]  toggle-check-box-mixin.js
│   │   ├── [4.0K Apr  2 18:36]  indicators
│   │   │   ├── [4.0K Apr  2 18:36]  res
│   │   │   │   └── [ 154 Apr  2 18:42]  indicator-template.html
│   │   │   ├── [2.8K Apr  2 18:42]  IndicatorAPI.js
│   │   │   ├── [3.5K Apr  2 18:42]  IndicatorAPISpec.js
│   │   │   └── [3.8K Apr  2 18:42]  SimpleIndicator.js
│   │   ├── [4.0K Apr  2 18:36]  menu
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.9K Apr  2 18:42]  Menu.vue
│   │   │   │   └── [2.9K Apr  2 18:42]  SuperMenu.vue
│   │   │   ├── [4.7K Apr  2 18:42]  MenuAPI.js
│   │   │   ├── [7.7K Apr  2 18:42]  MenuAPISpec.js
│   │   │   └── [5.7K Apr  2 18:42]  menu.js
│   │   ├── [4.0K Apr  2 18:36]  notifications
│   │   │   ├── [ 15K Apr  2 18:42]  NotificationAPI.js
│   │   │   └── [6.2K Apr  2 18:42]  NotificationAPISpec.js
│   │   ├── [4.0K Apr  2 18:36]  objects
│   │   │   ├── [4.0K Apr  2 18:36]  test
│   │   │   │   ├── [5.3K Apr  2 18:42]  object-utilsSpec.js
│   │   │   │   ├── [1.9K Apr  2 18:42]  RootObjectProviderSpec.js
│   │   │   │   └── [4.5K Apr  2 18:42]  RootRegistrySpec.js
│   │   │   ├── [  53 Apr  2 18:42]  ConflictError.js
│   │   │   ├── [ 20K Apr  2 18:42]  InMemorySearchProvider.js
│   │   │   ├── [7.1K Apr  2 18:42]  InMemorySearchWorker.js
│   │   │   ├── [3.1K Apr  2 18:42]  InterceptorRegistry.js
│   │   │   ├── [   0 Apr  2 18:42]  InterceptorRegistrySpec.js
│   │   │   ├── [6.0K Apr  2 18:42]  MutableDomainObject.js
│   │   │   ├── [ 29K Apr  2 18:42]  ObjectAPI.js
│   │   │   ├── [9.1K Apr  2 18:42]  ObjectAPISearchSpec.js
│   │   │   ├── [ 22K Apr  2 18:42]  ObjectAPISpec.js
│   │   │   ├── [5.5K Apr  2 18:42]  object-utils.js
│   │   │   ├── [2.2K Apr  2 18:42]  RootObjectProvider.js
│   │   │   ├── [2.2K Apr  2 18:42]  RootRegistry.js
│   │   │   ├── [2.8K Apr  2 18:42]  Transaction.js
│   │   │   └── [3.6K Apr  2 18:42]  TransactionSpec.js
│   │   ├── [4.0K Apr  2 18:36]  overlays
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.6K Apr  2 18:42]  dialog-component.scss
│   │   │   │   ├── [ 832 Apr  2 18:42]  DialogComponent.vue
│   │   │   │   ├── [3.8K Apr  2 18:42]  overlay-component.scss
│   │   │   │   ├── [2.4K Apr  2 18:42]  OverlayComponent.vue
│   │   │   │   └── [ 549 Apr  2 18:42]  ProgressDialogComponent.vue
│   │   │   ├── [ 858 Apr  2 18:42]  Dialog.js
│   │   │   ├── [4.7K Apr  2 18:42]  OverlayAPI.js
│   │   │   ├── [1.8K Apr  2 18:42]  Overlay.js
│   │   │   └── [1.3K Apr  2 18:42]  ProgressDialog.js
│   │   ├── [4.0K Apr  2 18:36]  priority
│   │   │   └── [1.3K Apr  2 18:42]  PriorityAPI.js
│   │   ├── [4.0K Apr  2 18:36]  status
│   │   │   ├── [2.3K Apr  2 18:42]  StatusAPI.js
│   │   │   └── [2.4K Apr  2 18:42]  StatusAPISpec.js
│   │   ├── [4.0K Apr  2 18:36]  telemetry
│   │   │   ├── [1.5K Apr  2 18:42]  constants.js
│   │   │   ├── [4.4K Apr  2 18:42]  DefaultMetadataProvider.js
│   │   │   ├── [ 29K Apr  2 18:42]  TelemetryAPI.js
│   │   │   ├── [ 23K Apr  2 18:42]  TelemetryAPISpec.js
│   │   │   ├── [ 16K Apr  2 18:42]  TelemetryCollection.js
│   │   │   ├── [3.2K Apr  2 18:42]  TelemetryCollectionSpec.js
│   │   │   ├── [5.4K Apr  2 18:42]  TelemetryMetadataManager.js
│   │   │   ├── [3.0K Apr  2 18:42]  TelemetryRequestInterceptor.js
│   │   │   └── [5.4K Apr  2 18:42]  TelemetryValueFormatter.js
│   │   ├── [4.0K Apr  2 18:36]  time
│   │   │   ├── [3.9K Apr  2 18:42]  GlobalTimeContext.js
│   │   │   ├── [9.4K Apr  2 18:42]  independentTimeAPISpec.js
│   │   │   ├── [ 10K Apr  2 18:42]  IndependentTimeContext.js
│   │   │   ├── [8.5K Apr  2 18:42]  TimeAPI.js
│   │   │   ├── [9.1K Apr  2 18:42]  TimeAPISpec.js
│   │   │   └── [ 13K Apr  2 18:42]  TimeContext.js
│   │   ├── [4.0K Apr  2 18:36]  types
│   │   │   ├── [4.2K Apr  2 18:42]  Type.js
│   │   │   ├── [3.6K Apr  2 18:42]  TypeRegistry.js
│   │   │   └── [2.4K Apr  2 18:42]  TypeRegistrySpec.js
│   │   ├── [4.0K Apr  2 18:36]  user
│   │   │   ├── [1.3K Apr  2 18:42]  constants.js
│   │   │   ├── [ 10K Apr  2 18:42]  StatusAPI.js
│   │   │   ├── [3.4K Apr  2 18:42]  StatusUserProvider.js
│   │   │   ├── [5.3K Apr  2 18:42]  UserAPI.js
│   │   │   ├── [4.1K Apr  2 18:42]  UserAPISpec.js
│   │   │   ├── [1.5K Apr  2 18:42]  User.js
│   │   │   ├── [1.6K Apr  2 18:42]  UserProvider.js
│   │   │   └── [4.4K Apr  2 18:42]  UserStatusAPISpec.js
│   │   ├── [2.5K Apr  2 18:42]  api.js
│   │   ├── [2.0K Apr  2 18:42]  Branding.js
│   │   ├── [2.9K Apr  2 18:42]  Editor.js
│   │   └── [2.6K Apr  2 18:42]  EditorSpec.js
│   ├── [4.0K Apr  2 18:36]  exporters
│   │   ├── [1.6K Apr  2 18:42]  CSVExporter.js
│   │   ├── [6.3K Apr  2 18:42]  ImageExporter.js
│   │   ├── [2.4K Apr  2 18:42]  ImageExporterSpec.js
│   │   └── [1.5K Apr  2 18:42]  JSONExporter.js
│   ├── [4.0K Apr  2 18:36]  images
│   │   └── [4.0K Apr  2 18:36]  favicons
│   │       ├── [ 348 Apr  2 18:42]  favicon-16x16.png
│   │       ├── [ 628 Apr  2 18:42]  favicon-32x32.png
│   │       └── [1.6K Apr  2 18:42]  favicon-96x96.png
│   ├── [4.0K Apr  2 18:36]  plugins
│   │   ├── [4.0K Apr  2 18:36]  autoflow
│   │   │   ├── [1.4K Apr  2 18:42]  AutoflowTabularConstants.js
│   │   │   ├── [4.3K Apr  2 18:42]  AutoflowTabularController.js
│   │   │   ├── [2.1K Apr  2 18:42]  autoflow-tabular.html
│   │   │   ├── [2.0K Apr  2 18:42]  AutoflowTabularPlugin.js
│   │   │   ├── [ 14K Apr  2 18:42]  AutoflowTabularPluginSpec.js
│   │   │   ├── [3.6K Apr  2 18:42]  AutoflowTabularRowController.js
│   │   │   ├── [4.5K Apr  2 18:42]  AutoflowTabularView.js
│   │   │   ├── [2.3K Apr  2 18:42]  dom-observer.js
│   │   │   ├── [ 533 Apr  2 18:42]  README.md
│   │   │   └── [1.4K Apr  2 18:42]  VueView.js
│   │   ├── [4.0K Apr  2 18:36]  charts
│   │   │   ├── [4.0K Apr  2 18:36]  bar
│   │   │   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   │   │   ├── [1.5K Apr  2 18:42]  BarGraphInspectorViewProvider.js
│   │   │   │   │   ├── [ 15K Apr  2 18:42]  BarGraphOptions.vue
│   │   │   │   │   └── [5.2K Apr  2 18:42]  SeriesOptions.vue
│   │   │   │   ├── [2.0K Apr  2 18:42]  BarGraphCompositionPolicy.js
│   │   │   │   ├── [ 182 Apr  2 18:42]  BarGraphConstants.js
│   │   │   │   ├── [8.7K Apr  2 18:42]  BarGraphPlot.vue
│   │   │   │   ├── [3.2K Apr  2 18:42]  BarGraphViewProvider.js
│   │   │   │   ├── [ 16K Apr  2 18:42]  BarGraphView.vue
│   │   │   │   ├── [2.4K Apr  2 18:42]  plugin.js
│   │   │   │   └── [ 21K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [4.0K Apr  2 18:36]  scatter
│   │   │       ├── [4.0K Apr  2 18:36]  inspector
│   │   │       │   ├── [5.8K Apr  2 18:42]  PlotOptionsBrowse.vue
│   │   │       │   ├── [9.7K Apr  2 18:42]  PlotOptionsEdit.vue
│   │   │       │   ├── [1.9K Apr  2 18:42]  PlotOptions.vue
│   │   │       │   └── [1.5K Apr  2 18:42]  ScatterPlotInspectorViewProvider.js
│   │   │       ├── [4.9K Apr  2 18:42]  plugin.js
│   │   │       ├── [ 14K Apr  2 18:42]  pluginSpec.js
│   │   │       ├── [2.2K Apr  2 18:42]  ScatterPlotCompositionPolicy.js
│   │   │       ├── [ 244 Apr  2 18:42]  scatterPlotConstants.js
│   │   │       ├── [4.5K Apr  2 18:42]  ScatterPlotForm.vue
│   │   │       ├── [3.1K Apr  2 18:42]  ScatterPlotViewProvider.js
│   │   │       ├── [ 13K Apr  2 18:42]  ScatterPlotView.vue
│   │   │       └── [ 12K Apr  2 18:42]  ScatterPlotWithUnderlay.vue
│   │   ├── [4.0K Apr  2 18:36]  clearData
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   └── [ 409 Apr  2 18:42]  globalClearIndicator.vue
│   │   │   ├── [3.1K Apr  2 18:42]  ClearDataAction.js
│   │   │   ├── [2.3K Apr  2 18:42]  plugin.js
│   │   │   └── [8.4K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  clock
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.8K Apr  2 18:42]  ClockIndicator.vue
│   │   │   │   └── [3.0K Apr  2 18:42]  Clock.vue
│   │   │   ├── [2.2K Apr  2 18:42]  ClockViewProvider.js
│   │   │   ├── [5.7K Apr  2 18:42]  plugin.js
│   │   │   └── [8.2K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  condition
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   │   │   ├── [3.9K Apr  2 18:42]  conditional-styles.scss
│   │   │   │   │   ├── [   0 Apr  2 18:42]  ConditionalStylesView.vue
│   │   │   │   │   ├── [8.8K Apr  2 18:42]  StyleEditor.vue
│   │   │   │   │   └── [ 37K Apr  2 18:42]  StylesView.vue
│   │   │   │   ├── [7.0K Apr  2 18:42]  conditionals.scss
│   │   │   │   ├── [ 10K Apr  2 18:42]  ConditionCollection.vue
│   │   │   │   ├── [2.1K Apr  2 18:42]  ConditionDescription.vue
│   │   │   │   ├── [2.7K Apr  2 18:42]  ConditionError.vue
│   │   │   │   ├── [4.1K Apr  2 18:42]  ConditionSet.vue
│   │   │   │   ├── [ 15K Apr  2 18:42]  Condition.vue
│   │   │   │   ├── [ 12K Apr  2 18:42]  Criterion.vue
│   │   │   │   ├── [   0 Apr  2 18:42]  CurrentOutput.vue
│   │   │   │   └── [8.7K Apr  2 18:42]  TestData.vue
│   │   │   ├── [4.0K Apr  2 18:36]  criterion
│   │   │   │   ├── [ 11K Apr  2 18:42]  AllTelemetryCriterion.js
│   │   │   │   ├── [ 11K Apr  2 18:42]  TelemetryCriterion.js
│   │   │   │   └── [5.4K Apr  2 18:42]  TelemetryCriterionSpec.js
│   │   │   ├── [4.0K Apr  2 18:36]  utils
│   │   │   │   ├── [2.1K Apr  2 18:42]  constants.js
│   │   │   │   ├── [2.1K Apr  2 18:42]  evaluator.js
│   │   │   │   ├── [6.7K Apr  2 18:42]  evaluatorSpec.js
│   │   │   │   ├── [9.9K Apr  2 18:42]  operations.js
│   │   │   │   ├── [5.9K Apr  2 18:42]  operationsSpec.js
│   │   │   │   ├── [6.9K Apr  2 18:42]  styleUtils.js
│   │   │   │   ├── [2.4K Apr  2 18:42]  time.js
│   │   │   │   └── [2.3K Apr  2 18:42]  timeSpec.js
│   │   │   ├── [ 11K Apr  2 18:42]  Condition.js
│   │   │   ├── [ 17K Apr  2 18:42]  ConditionManager.js
│   │   │   ├── [7.1K Apr  2 18:42]  ConditionManagerSpec.js
│   │   │   ├── [1.5K Apr  2 18:42]  ConditionSetCompositionPolicy.js
│   │   │   ├── [3.7K Apr  2 18:42]  ConditionSetCompositionPolicySpec.js
│   │   │   ├── [2.6K Apr  2 18:42]  ConditionSetMetadataProvider.js
│   │   │   ├── [3.2K Apr  2 18:42]  ConditionSetTelemetryProvider.js
│   │   │   ├── [3.1K Apr  2 18:42]  ConditionSetViewProvider.js
│   │   │   ├── [7.0K Apr  2 18:42]  ConditionSpec.js
│   │   │   ├── [3.0K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 38K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [8.0K Apr  2 18:42]  StyleRuleManager.js
│   │   ├── [4.0K Apr  2 18:36]  conditionWidget
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [2.5K Apr  2 18:42]  condition-widget.scss
│   │   │   │   └── [5.3K Apr  2 18:42]  ConditionWidget.vue
│   │   │   ├── [2.5K Apr  2 18:42]  ConditionWidgetViewProvider.js
│   │   │   ├── [2.5K Apr  2 18:42]  plugin.js
│   │   │   └── [6.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  CouchDBSearchFolder
│   │   │   ├── [1.2K Apr  2 18:42]  plugin.js
│   │   │   └── [3.2K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  defaultRootName
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   └── [2.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  DeviceClassifier
│   │   │   ├── [4.0K Apr  2 18:36]  src
│   │   │   │   ├── [2.7K Apr  2 18:42]  DeviceClassifier.js
│   │   │   │   ├── [3.7K Apr  2 18:42]  DeviceClassifierSpec.js
│   │   │   │   ├── [2.0K Apr  2 18:42]  DeviceMatchers.js
│   │   │   │   └── [2.5K Apr  2 18:42]  DeviceMatchersSpec.js
│   │   │   └── [1.5K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  displayLayout
│   │   │   ├── [4.0K Apr  2 18:36]  actions
│   │   │   │   └── [1.2K Apr  2 18:42]  CopyToClipboardAction.js
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [3.6K Apr  2 18:42]  AlphanumericFormat.vue
│   │   │   │   ├── [1.2K Apr  2 18:42]  box-and-line-views.scss
│   │   │   │   ├── [3.4K Apr  2 18:42]  BoxView.vue
│   │   │   │   ├── [1.1K Apr  2 18:42]  DisplayLayoutGrid.vue
│   │   │   │   ├── [2.3K Apr  2 18:42]  display-layout.scss
│   │   │   │   ├── [ 34K Apr  2 18:42]  DisplayLayout.vue
│   │   │   │   ├── [1.2K Apr  2 18:42]  edit-marquee.scss
│   │   │   │   ├── [7.2K Apr  2 18:42]  EditMarquee.vue
│   │   │   │   ├── [3.4K Apr  2 18:42]  EllipseView.vue
│   │   │   │   ├── [ 200 Apr  2 18:42]  image-view.scss
│   │   │   │   ├── [3.6K Apr  2 18:42]  ImageView.vue
│   │   │   │   ├── [4.2K Apr  2 18:42]  layout-frame.scss
│   │   │   │   ├── [4.6K Apr  2 18:42]  LayoutFrame.vue
│   │   │   │   ├── [ 11K Apr  2 18:42]  LineView.vue
│   │   │   │   ├── [5.6K Apr  2 18:42]  SubobjectView.vue
│   │   │   │   ├── [ 840 Apr  2 18:42]  telemetry-view.scss
│   │   │   │   ├── [ 13K Apr  2 18:42]  TelemetryView.vue
│   │   │   │   ├── [ 226 Apr  2 18:42]  text-view.scss
│   │   │   │   └── [3.6K Apr  2 18:42]  TextView.vue
│   │   │   ├── [4.0K Apr  2 18:36]  mixins
│   │   │   │   └── [3.4K Apr  2 18:42]  objectStyles-mixin.js
│   │   │   ├── [3.3K Apr  2 18:42]  AlphanumericFormatViewProvider.js
│   │   │   ├── [1000 Apr  2 18:42]  CustomStringFormatter.js
│   │   │   ├── [2.1K Apr  2 18:42]  CustomStringFormatterSpec.js
│   │   │   ├── [ 38K Apr  2 18:42]  DisplayLayoutToolbar.js
│   │   │   ├── [3.4K Apr  2 18:42]  DisplayLayoutType.js
│   │   │   ├── [ 836 Apr  2 18:42]  DrawingObjectTypes.js
│   │   │   ├── [5.1K Apr  2 18:42]  LayoutDrag.js
│   │   │   ├── [5.2K Apr  2 18:42]  plugin.js
│   │   │   └── [ 15K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  duplicate
│   │   │   ├── [5.8K Apr  2 18:42]  DuplicateAction.js
│   │   │   ├── [9.5K Apr  2 18:42]  DuplicateTask.js
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   └── [5.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  exportAsJSONAction
│   │   │   ├── [8.6K Apr  2 18:42]  ExportAsJSONAction.js
│   │   │   ├── [ 12K Apr  2 18:42]  ExportAsJSONActionSpec.js
│   │   │   └── [1.4K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  faultManagement
│   │   │   ├── [3.4K Apr  2 18:42]  constants.js
│   │   │   ├── [2.7K Apr  2 18:42]  FaultManagementInspectorViewProvider.js
│   │   │   ├── [3.9K Apr  2 18:42]  FaultManagementInspector.vue
│   │   │   ├── [3.5K Apr  2 18:42]  FaultManagementListHeader.vue
│   │   │   ├── [7.4K Apr  2 18:42]  FaultManagementListItem.vue
│   │   │   ├── [ 11K Apr  2 18:42]  FaultManagementListView.vue
│   │   │   ├── [2.1K Apr  2 18:42]  FaultManagementObjectProvider.js
│   │   │   ├── [2.1K Apr  2 18:42]  FaultManagementPlugin.js
│   │   │   ├── [2.6K Apr  2 18:42]  FaultManagementSearch.vue
│   │   │   ├── [3.0K Apr  2 18:42]  FaultManagementToolbar.vue
│   │   │   ├── [2.4K Apr  2 18:42]  FaultManagementViewProvider.js
│   │   │   ├── [2.7K Apr  2 18:42]  FaultManagementView.vue
│   │   │   ├── [6.4K Apr  2 18:42]  fault-manager.scss
│   │   │   └── [3.8K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  filters
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [4.2K Apr  2 18:42]  FilterField.vue
│   │   │   │   ├── [5.5K Apr  2 18:42]  FilterObject.vue
│   │   │   │   ├── [ 410 Apr  2 18:42]  filters-view.scss
│   │   │   │   ├── [8.8K Apr  2 18:42]  FiltersView.vue
│   │   │   │   ├── [ 766 Apr  2 18:42]  global-filters.scss
│   │   │   │   └── [3.5K Apr  2 18:42]  GlobalFilters.vue
│   │   │   ├── [3.1K Apr  2 18:42]  FiltersInspectorViewProvider.js
│   │   │   └── [1.5K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  flexibleLayout
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [7.1K Apr  2 18:42]  container.vue
│   │   │   │   ├── [2.7K Apr  2 18:42]  dropHint.vue
│   │   │   │   ├── [7.2K Apr  2 18:42]  flexible-layout.scss
│   │   │   │   ├── [ 14K Apr  2 18:42]  flexibleLayout.vue
│   │   │   │   ├── [5.4K Apr  2 18:42]  frame.vue
│   │   │   │   └── [3.4K Apr  2 18:42]  resizeHandle.vue
│   │   │   ├── [4.0K Apr  2 18:36]  utils
│   │   │   │   ├── [ 191 Apr  2 18:42]  container.js
│   │   │   │   └── [ 274 Apr  2 18:42]  frame.js
│   │   │   ├── [3.7K Apr  2 18:42]  flexibleLayoutViewProvider.js
│   │   │   ├── [2.3K Apr  2 18:42]  plugin.js
│   │   │   ├── [7.2K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [8.9K Apr  2 18:42]  toolbarProvider.js
│   │   ├── [4.0K Apr  2 18:36]  folderView
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.6K Apr  2 18:42]  composition-loader.js
│   │   │   │   ├── [1.8K Apr  2 18:42]  GridItem.vue
│   │   │   │   ├── [4.1K Apr  2 18:42]  grid-view.scss
│   │   │   │   ├── [ 418 Apr  2 18:42]  GridView.vue
│   │   │   │   ├── [ 593 Apr  2 18:42]  list-item.scss
│   │   │   │   ├── [1.7K Apr  2 18:42]  ListItem.vue
│   │   │   │   ├── [3.5K Apr  2 18:42]  ListView.vue
│   │   │   │   └── [ 725 Apr  2 18:42]  status-listener.js
│   │   │   ├── [1.2K Apr  2 18:42]  constants.js
│   │   │   ├── [2.6K Apr  2 18:42]  FolderGridView.js
│   │   │   ├── [2.7K Apr  2 18:42]  FolderListView.js
│   │   │   ├── [2.0K Apr  2 18:42]  plugin.js
│   │   │   └── [5.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  formActions
│   │   │   ├── [6.2K Apr  2 18:42]  CreateAction.js
│   │   │   ├── [4.0K Apr  2 18:42]  CreateActionSpec.js
│   │   │   ├── [4.6K Apr  2 18:42]  CreateWizard.js
│   │   │   ├── [3.5K Apr  2 18:42]  EditPropertiesAction.js
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [6.9K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [1.4K Apr  2 18:42]  PropertiesAction.js
│   │   ├── [4.0K Apr  2 18:36]  gauge
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [5.5K Apr  2 18:42]  GaugeFormController.vue
│   │   │   │   └── [ 28K Apr  2 18:42]  Gauge.vue
│   │   │   ├── [ 841 Apr  2 18:42]  gauge-limit-util.js
│   │   │   ├── [7.7K Apr  2 18:42]  GaugePlugin.js
│   │   │   ├── [ 29K Apr  2 18:42]  GaugePluginSpec.js
│   │   │   ├── [5.5K Apr  2 18:42]  gauge.scss
│   │   │   └── [2.5K Apr  2 18:42]  GaugeViewProvider.js
│   │   ├── [4.0K Apr  2 18:36]  goToOriginalAction
│   │   │   ├── [2.3K Apr  2 18:42]  goToOriginalAction.js
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   └── [6.2K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  hyperlink
│   │   │   ├── [1.8K Apr  2 18:42]  HyperlinkLayout.vue
│   │   │   ├── [2.2K Apr  2 18:42]  HyperlinkProvider.js
│   │   │   ├── [3.4K Apr  2 18:42]  plugin.js
│   │   │   └── [4.4K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  imagery
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [4.0K Apr  2 18:36]  Compass
│   │   │   │   │   ├── [4.1K Apr  2 18:42]  CompassHUD.vue
│   │   │   │   │   ├── [ 14K Apr  2 18:42]  CompassRose.vue
│   │   │   │   │   ├── [3.7K Apr  2 18:42]  compass.scss
│   │   │   │   │   ├── [3.4K Apr  2 18:42]  Compass.vue
│   │   │   │   │   ├── [2.9K Apr  2 18:42]  pluginSpec.js
│   │   │   │   │   └── [1.1K Apr  2 18:42]  utils.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  RelatedTelemetry
│   │   │   │   │   └── [7.0K Apr  2 18:42]  RelatedTelemetry.js
│   │   │   │   ├── [2.2K Apr  2 18:42]  FilterSettings.vue
│   │   │   │   ├── [9.0K Apr  2 18:42]  ImageControls.vue
│   │   │   │   ├── [ 15K Apr  2 18:42]  ImageryTimeView.vue
│   │   │   │   ├── [1.3K Apr  2 18:42]  ImageryViewMenuSwitcher.vue
│   │   │   │   ├── [ 11K Apr  2 18:42]  imagery-view.scss
│   │   │   │   ├── [ 46K Apr  2 18:42]  ImageryView.vue
│   │   │   │   ├── [4.2K Apr  2 18:42]  ImageThumbnail.vue
│   │   │   │   ├── [1.6K Apr  2 18:42]  LayerSettings.vue
│   │   │   │   └── [2.3K Apr  2 18:42]  ZoomSettings.vue
│   │   │   ├── [4.0K Apr  2 18:36]  layers
│   │   │   │   ├── [8.4K Apr  2 18:42]  example-imagery-layer-16x9.png
│   │   │   │   ├── [9.0K Apr  2 18:42]  example-imagery-layer-safe.png
│   │   │   │   └── [ 11K Apr  2 18:42]  example-imagery-layer-scale.png
│   │   │   ├── [4.0K Apr  2 18:36]  lib
│   │   │   │   └── [3.7K Apr  2 18:42]  eventHelpers.js
│   │   │   ├── [4.0K Apr  2 18:36]  mixins
│   │   │   │   └── [7.6K Apr  2 18:42]  imageryData.js
│   │   │   ├── [2.9K Apr  2 18:42]  ImageryTimestripViewProvider.js
│   │   │   ├── [2.4K Apr  2 18:42]  ImageryView.js
│   │   │   ├── [2.1K Apr  2 18:42]  ImageryViewProvider.js
│   │   │   ├── [1.5K Apr  2 18:42]  plugin.js
│   │   │   └── [ 26K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  importFromJSONAction
│   │   │   ├── [8.9K Apr  2 18:42]  ImportFromJSONAction.js
│   │   │   ├── [4.3K Apr  2 18:42]  ImportFromJSONActionSpec.js
│   │   │   └── [1.4K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  inspectorViews
│   │   │   ├── [4.0K Apr  2 18:36]  annotations
│   │   │   │   ├── [4.0K Apr  2 18:36]  tags
│   │   │   │   │   ├── [7.5K Apr  2 18:42]  TagEditor.vue
│   │   │   │   │   ├── [5.1K Apr  2 18:42]  TagSelection.vue
│   │   │   │   │   └── [3.4K Apr  2 18:42]  tags.scss
│   │   │   │   ├── [8.1K Apr  2 18:42]  AnnotationsInspectorView.vue
│   │   │   │   └── [2.5K Apr  2 18:42]  AnnotationsViewProvider.js
│   │   │   ├── [4.0K Apr  2 18:36]  elements
│   │   │   │   ├── [2.8K Apr  2 18:42]  ElementItemGroup.vue
│   │   │   │   ├── [3.4K Apr  2 18:42]  ElementItem.vue
│   │   │   │   ├── [5.8K Apr  2 18:42]  ElementsPool.vue
│   │   │   │   ├── [1.4K Apr  2 18:42]  elements.scss
│   │   │   │   ├── [2.7K Apr  2 18:42]  ElementsViewProvider.js
│   │   │   │   ├── [ 13K Apr  2 18:42]  PlotElementsPool.vue
│   │   │   │   └── [2.6K Apr  2 18:42]  PlotElementsViewProvider.js
│   │   │   ├── [4.0K Apr  2 18:36]  properties
│   │   │   │   ├── [1.5K Apr  2 18:42]  DetailText.vue
│   │   │   │   ├── [1.0K Apr  2 18:42]  location.scss
│   │   │   │   ├── [3.7K Apr  2 18:42]  Location.vue
│   │   │   │   ├── [2.2K Apr  2 18:42]  PropertiesViewProvider.js
│   │   │   │   └── [7.9K Apr  2 18:42]  Properties.vue
│   │   │   ├── [4.0K Apr  2 18:36]  styles
│   │   │   │   ├── [1.5K Apr  2 18:42]  constants.js
│   │   │   │   ├── [3.0K Apr  2 18:42]  FontStyleEditor.vue
│   │   │   │   ├── [6.4K Apr  2 18:42]  SavedStyleSelector.vue
│   │   │   │   ├── [2.6K Apr  2 18:42]  SavedStylesInspectorView.vue
│   │   │   │   ├── [4.4K Apr  2 18:42]  SavedStylesView.vue
│   │   │   │   ├── [3.3K Apr  2 18:42]  StylesInspectorViewProvider.js
│   │   │   │   ├── [2.3K Apr  2 18:42]  StylesInspectorView.vue
│   │   │   │   └── [2.6K Apr  2 18:42]  StylesManager.js
│   │   │   └── [2.0K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  interceptors
│   │   │   ├── [1.8K Apr  2 18:42]  missingObjectInterceptor.js
│   │   │   ├── [ 194 Apr  2 18:42]  plugin.js
│   │   │   └── [2.8K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  ISOTimeFormat
│   │   │   ├── [1.6K Apr  2 18:42]  ISOTimeFormat.js
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   └── [2.2K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  LADTable
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [8.7K Apr  2 18:42]  LADRow.vue
│   │   │   │   ├── [9.4K Apr  2 18:42]  LADTableConfiguration.vue
│   │   │   │   ├── [ 10K Apr  2 18:42]  LadTableSet.vue
│   │   │   │   └── [8.7K Apr  2 18:42]  LADTable.vue
│   │   │   ├── [1.5K Apr  2 18:42]  LADTableCompositionPolicy.js
│   │   │   ├── [2.2K Apr  2 18:42]  LADTableConfiguration.js
│   │   │   ├── [2.5K Apr  2 18:42]  LADTableConfigurationViewProvider.js
│   │   │   ├── [2.5K Apr  2 18:42]  LadTableSetView.js
│   │   │   ├── [1.8K Apr  2 18:42]  LADTableSetViewProvider.js
│   │   │   ├── [2.5K Apr  2 18:42]  LADTableView.js
│   │   │   ├── [2.2K Apr  2 18:42]  LADTableViewProvider.js
│   │   │   ├── [2.7K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 15K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [2.2K Apr  2 18:42]  ViewActions.js
│   │   ├── [4.0K Apr  2 18:36]  latestDataClock
│   │   │   ├── [1.9K Apr  2 18:42]  LADClock.js
│   │   │   └── [1.4K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  licenses
│   │   │   ├── [2.2K Apr  2 18:42]  Licenses.vue
│   │   │   ├── [1.6K Apr  2 18:42]  plugin.js
│   │   │   └── [ 41K Apr  2 18:42]  third-party-licenses.json
│   │   ├── [4.0K Apr  2 18:36]  linkAction
│   │   │   ├── [5.2K Apr  2 18:42]  LinkAction.js
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   └── [4.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  localStorage
│   │   │   ├── [2.8K Apr  2 18:42]  LocalStorageObjectProvider.js
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   └── [3.1K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  localTimeSystem
│   │   │   ├── [2.4K Apr  2 18:42]  LocalTimeFormat.js
│   │   │   ├── [1.8K Apr  2 18:42]  LocalTimeSystem.js
│   │   │   ├── [1.5K Apr  2 18:42]  plugin.js
│   │   │   └── [3.8K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  move
│   │   │   ├── [7.4K Apr  2 18:42]  MoveAction.js
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   └── [5.3K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  myItems
│   │   │   ├── [ 162 Apr  2 18:42]  createMyItemsIdentifier.js
│   │   │   ├── [1.9K Apr  2 18:42]  myItemsInterceptor.js
│   │   │   ├── [1.8K Apr  2 18:42]  plugin.js
│   │   │   ├── [4.2K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [ 258 Apr  2 18:42]  README.md
│   │   ├── [4.0K Apr  2 18:36]  newFolderAction
│   │   │   ├── [2.0K Apr  2 18:42]  newFolderAction.js
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   └── [3.7K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  notebook
│   │   │   ├── [4.0K Apr  2 18:36]  actions
│   │   │   │   ├── [1.7K Apr  2 18:42]  CopyToNotebookAction.js
│   │   │   │   └── [5.9K Apr  2 18:42]  ExportNotebookAsTextAction.js
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [ 383 Apr  2 18:42]  MenuItems.vue
│   │   │   │   ├── [ 13K Apr  2 18:42]  NotebookEmbed.vue
│   │   │   │   ├── [ 17K Apr  2 18:42]  NotebookEntry.vue
│   │   │   │   ├── [4.0K Apr  2 18:42]  NotebookMenuSwitcher.vue
│   │   │   │   ├── [4.1K Apr  2 18:42]  NotebookSnapshotContainer.vue
│   │   │   │   ├── [3.2K Apr  2 18:42]  NotebookSnapshotIndicator.vue
│   │   │   │   ├── [ 36K Apr  2 18:42]  Notebook.vue
│   │   │   │   ├── [3.8K Apr  2 18:42]  PageCollection.vue
│   │   │   │   ├── [3.9K Apr  2 18:42]  PageComponent.vue
│   │   │   │   ├── [2.4K Apr  2 18:42]  PopupMenu.vue
│   │   │   │   ├── [2.7K Apr  2 18:42]  SearchResults.vue
│   │   │   │   ├── [3.5K Apr  2 18:42]  SectionCollection.vue
│   │   │   │   ├── [3.7K Apr  2 18:42]  SectionComponent.vue
│   │   │   │   ├── [1.9K Apr  2 18:42]  sidebar.scss
│   │   │   │   ├── [7.1K Apr  2 18:42]  Sidebar.vue
│   │   │   │   └── [1.8K Apr  2 18:42]  snapshot-template.html
│   │   │   ├── [4.0K Apr  2 18:36]  utils
│   │   │   │   ├── [5.6K Apr  2 18:42]  notebook-entries.js
│   │   │   │   ├── [6.5K Apr  2 18:42]  notebook-entriesSpec.js
│   │   │   │   ├── [2.4K Apr  2 18:42]  notebook-image.js
│   │   │   │   ├── [ 101 Apr  2 18:42]  notebook-key-code.js
│   │   │   │   ├── [2.2K Apr  2 18:42]  notebook-migration.js
│   │   │   │   ├── [1.2K Apr  2 18:42]  notebook-snapshot-menu.js
│   │   │   │   ├── [3.5K Apr  2 18:42]  notebook-storage.js
│   │   │   │   ├── [5.7K Apr  2 18:42]  notebook-storageSpec.js
│   │   │   │   ├── [2.4K Apr  2 18:42]  painterroInstance.js
│   │   │   │   └── [1.1K Apr  2 18:42]  removeDialog.js
│   │   │   ├── [4.7K Apr  2 18:42]  monkeyPatchObjectAPIForNotebooks.js
│   │   │   ├── [1.1K Apr  2 18:42]  notebook-constants.js
│   │   │   ├── [3.0K Apr  2 18:42]  NotebookType.js
│   │   │   ├── [2.7K Apr  2 18:42]  NotebookViewProvider.js
│   │   │   ├── [5.5K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 16K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [2.3K Apr  2 18:42]  snapshot-container.js
│   │   │   └── [4.3K Apr  2 18:42]  snapshot.js
│   │   ├── [4.0K Apr  2 18:36]  notificationIndicator
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [2.2K Apr  2 18:42]  NotificationIndicator.vue
│   │   │   │   ├── [3.0K Apr  2 18:42]  NotificationMessage.vue
│   │   │   │   └── [2.1K Apr  2 18:42]  NotificationsList.vue
│   │   │   ├── [1.8K Apr  2 18:42]  plugin.js
│   │   │   └── [2.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  objectMigration
│   │   │   ├── [ 12K Apr  2 18:42]  Migrations.js
│   │   │   └── [2.2K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  openInNewTabAction
│   │   │   ├── [1.7K Apr  2 18:42]  openInNewTabAction.js
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   └── [2.5K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  operatorStatus
│   │   │   ├── [4.0K Apr  2 18:36]  operatorStatus
│   │   │   │   ├── [2.6K Apr  2 18:42]  OperatorStatusIndicator.js
│   │   │   │   └── [6.4K Apr  2 18:42]  OperatorStatus.vue
│   │   │   ├── [4.0K Apr  2 18:36]  pollQuestion
│   │   │   │   ├── [2.6K Apr  2 18:42]  PollQuestionIndicator.js
│   │   │   │   └── [ 11K Apr  2 18:42]  PollQuestion.vue
│   │   │   ├── [3.7K Apr  2 18:42]  AbstractStatusIndicator.js
│   │   │   ├── [3.8K Apr  2 18:42]  operator-status.scss
│   │   │   └── [2.2K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  performanceIndicator
│   │   │   ├── [2.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [2.6K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [ 483 Apr  2 18:42]  README.md
│   │   ├── [4.0K Apr  2 18:36]  persistence
│   │   │   └── [4.0K Apr  2 18:36]  couch
│   │   │       ├── [3.7K Apr  2 18:42]  CouchChangesFeed.js
│   │   │       ├── [ 269 Apr  2 18:42]  couchdb-compose.yaml
│   │   │       ├── [2.2K Apr  2 18:42]  CouchDocument.js
│   │   │       ├── [ 24K Apr  2 18:42]  CouchObjectProvider.js
│   │   │       ├── [1.6K Apr  2 18:42]  CouchObjectQueue.js
│   │   │       ├── [4.5K Apr  2 18:42]  CouchSearchProvider.js
│   │   │       ├── [3.2K Apr  2 18:42]  CouchStatusIndicator.js
│   │   │       ├── [2.3K Apr  2 18:42]  plugin.js
│   │   │       ├── [ 15K Apr  2 18:42]  pluginSpec.js
│   │   │       ├── [4.7K Apr  2 18:42]  README.md
│   │   │       ├── [ 108 Apr  2 18:42]  replace-localstorage-with-couchdb-indexhtml.sh
│   │   │       └── [4.7K Apr  2 18:42]  setup-couchdb.sh
│   │   ├── [4.0K Apr  2 18:36]  plan
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [5.8K Apr  2 18:42]  ActivityTimeline.vue
│   │   │   │   └── [ 21K Apr  2 18:42]  Plan.vue
│   │   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   │   ├── [1.5K Apr  2 18:42]  ActivityProperty.vue
│   │   │   │   │   ├── [7.0K Apr  2 18:42]  PlanActivitiesView.vue
│   │   │   │   │   ├── [2.4K Apr  2 18:42]  PlanActivityView.vue
│   │   │   │   │   └── [4.9K Apr  2 18:42]  PlanViewConfiguration.vue
│   │   │   │   ├── [2.7K Apr  2 18:42]  ActivityInspectorViewProvider.js
│   │   │   │   └── [2.6K Apr  2 18:42]  GanttChartInspectorViewProvider.js
│   │   │   ├── [1.4K Apr  2 18:42]  GanttChartCompositionPolicy.js
│   │   │   ├── [1.7K Apr  2 18:42]  plan.scss
│   │   │   ├── [3.8K Apr  2 18:42]  PlanViewConfiguration.js
│   │   │   ├── [3.0K Apr  2 18:42]  PlanViewProvider.js
│   │   │   ├── [3.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [9.8K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [3.5K Apr  2 18:42]  README.md
│   │   │   └── [3.1K Apr  2 18:42]  util.js
│   │   ├── [4.0K Apr  2 18:36]  plot
│   │   │   ├── [4.0K Apr  2 18:36]  actions
│   │   │   │   ├── [ 138 Apr  2 18:42]  utils.js
│   │   │   │   └── [1.9K Apr  2 18:42]  ViewActions.js
│   │   │   ├── [4.0K Apr  2 18:36]  axis
│   │   │   │   ├── [5.2K Apr  2 18:42]  XAxis.vue
│   │   │   │   └── [9.2K Apr  2 18:42]  YAxis.vue
│   │   │   ├── [4.0K Apr  2 18:36]  chart
│   │   │   │   ├── [1.2K Apr  2 18:42]  LimitLabel.vue
│   │   │   │   ├── [ 764 Apr  2 18:42]  LimitLine.vue
│   │   │   │   ├── [ 919 Apr  2 18:42]  limitUtil.js
│   │   │   │   ├── [3.9K Apr  2 18:42]  MCTChartAlarmLineSet.js
│   │   │   │   ├── [2.3K Apr  2 18:42]  MCTChartAlarmPointSet.js
│   │   │   │   ├── [1.4K Apr  2 18:42]  MCTChartLineLinear.js
│   │   │   │   ├── [2.7K Apr  2 18:42]  MCTChartLineStepAfter.js
│   │   │   │   ├── [1.5K Apr  2 18:42]  MCTChartPointSet.js
│   │   │   │   ├── [5.1K Apr  2 18:42]  MCTChartSeriesElement.js
│   │   │   │   └── [ 34K Apr  2 18:42]  MctChart.vue
│   │   │   ├── [4.0K Apr  2 18:36]  configuration
│   │   │   │   ├── [3.2K Apr  2 18:42]  Collection.js
│   │   │   │   ├── [1.9K Apr  2 18:42]  ConfigStore.js
│   │   │   │   ├── [2.4K Apr  2 18:42]  LegendModel.js
│   │   │   │   ├── [4.3K Apr  2 18:42]  Model.js
│   │   │   │   ├── [7.6K Apr  2 18:42]  PlotConfigurationModel.js
│   │   │   │   ├── [ 19K Apr  2 18:42]  PlotSeries.js
│   │   │   │   ├── [7.4K Apr  2 18:42]  SeriesCollection.js
│   │   │   │   ├── [4.5K Apr  2 18:42]  XAxisModel.js
│   │   │   │   └── [ 12K Apr  2 18:42]  YAxisModel.js
│   │   │   ├── [4.0K Apr  2 18:36]  draw
│   │   │   │   ├── [5.0K Apr  2 18:42]  Draw2D.js
│   │   │   │   ├── [3.1K Apr  2 18:42]  DrawLoader.js
│   │   │   │   ├── [ 10K Apr  2 18:42]  DrawWebGL.js
│   │   │   │   └── [3.0K Apr  2 18:42]  MarkerShapes.js
│   │   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   │   ├── [4.0K Apr  2 18:36]  forms
│   │   │   │   │   ├── [ 381 Apr  2 18:42]  formUtil.js
│   │   │   │   │   ├── [7.9K Apr  2 18:42]  LegendForm.vue
│   │   │   │   │   ├── [ 13K Apr  2 18:42]  SeriesForm.vue
│   │   │   │   │   └── [ 12K Apr  2 18:42]  YAxisForm.vue
│   │   │   │   ├── [ 12K Apr  2 18:42]  PlotOptionsBrowse.vue
│   │   │   │   ├── [7.8K Apr  2 18:42]  PlotOptionsEdit.vue
│   │   │   │   ├── [5.4K Apr  2 18:42]  PlotOptionsItem.vue
│   │   │   │   ├── [1.9K Apr  2 18:42]  PlotOptions.vue
│   │   │   │   ├── [1.9K Apr  2 18:42]  PlotsInspectorViewProvider.js
│   │   │   │   └── [1.8K Apr  2 18:42]  StackedPlotsInspectorViewProvider.js
│   │   │   ├── [4.0K Apr  2 18:36]  legend
│   │   │   │   ├── [6.0K Apr  2 18:42]  PlotLegendItemCollapsed.vue
│   │   │   │   ├── [6.8K Apr  2 18:42]  PlotLegendItemExpanded.vue
│   │   │   │   └── [8.8K Apr  2 18:42]  PlotLegend.vue
│   │   │   ├── [4.0K Apr  2 18:36]  lib
│   │   │   │   └── [3.4K Apr  2 18:42]  eventHelpers.js
│   │   │   ├── [4.0K Apr  2 18:36]  overlayPlot
│   │   │   │   ├── [ 850 Apr  2 18:42]  OverlayPlotCompositionPolicy.js
│   │   │   │   ├── [3.2K Apr  2 18:42]  OverlayPlotViewProvider.js
│   │   │   │   └── [ 16K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [4.0K Apr  2 18:36]  stackedPlot
│   │   │   │   ├── [4.0K Apr  2 18:36]  mixins
│   │   │   │   │   └── [5.3K Apr  2 18:42]  objectStyles-mixin.js
│   │   │   │   ├── [ 28K Apr  2 18:42]  pluginSpec.js
│   │   │   │   ├── [ 912 Apr  2 18:42]  StackedPlotCompositionPolicy.js
│   │   │   │   ├── [1.7K Apr  2 18:42]  stackedPlotConfigurationInterceptor.js
│   │   │   │   ├── [ 15K Apr  2 18:42]  StackedPlotItem.vue
│   │   │   │   ├── [3.2K Apr  2 18:42]  StackedPlotViewProvider.js
│   │   │   │   └── [ 11K Apr  2 18:42]  StackedPlot.vue
│   │   │   ├── [2.7K Apr  2 18:42]  LinearScale.js
│   │   │   ├── [1.2K Apr  2 18:42]  mathUtils.js
│   │   │   ├── [ 69K Apr  2 18:42]  MctPlot.vue
│   │   │   ├── [8.8K Apr  2 18:42]  MctTicks.vue
│   │   │   ├── [3.7K Apr  2 18:42]  PlotViewProvider.js
│   │   │   ├── [8.2K Apr  2 18:42]  Plot.vue
│   │   │   ├── [4.0K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 33K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [ 396 Apr  2 18:42]  README.md
│   │   │   └── [3.8K Apr  2 18:42]  tickUtils.js
│   │   ├── [4.0K Apr  2 18:36]  remoteClock
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [5.2K Apr  2 18:42]  RemoteClock.js
│   │   │   ├── [5.9K Apr  2 18:42]  RemoteClockSpec.js
│   │   │   └── [1.8K Apr  2 18:42]  requestInterceptor.js
│   │   ├── [4.0K Apr  2 18:36]  remove
│   │   │   ├── [1.3K Apr  2 18:42]  plugin.js
│   │   │   ├── [4.9K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [5.5K Apr  2 18:42]  RemoveAction.js
│   │   ├── [4.0K Apr  2 18:36]  staticRootPlugin
│   │   │   ├── [2.3K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 898 Apr  2 18:42]  README.md
│   │   │   ├── [5.9K Apr  2 18:42]  StaticModelProvider.js
│   │   │   ├── [5.1K Apr  2 18:42]  StaticModelProviderSpec.js
│   │   │   └── [1.9K Apr  2 18:42]  static-provider-test.json
│   │   ├── [4.0K Apr  2 18:36]  summaryWidget
│   │   │   ├── [4.0K Apr  2 18:36]  res
│   │   │   │   ├── [4.0K Apr  2 18:36]  input
│   │   │   │   │   ├── [ 734 Apr  2 18:42]  paletteTemplate.html
│   │   │   │   │   └── [  43 Apr  2 18:42]  selectTemplate.html
│   │   │   │   ├── [ 529 Apr  2 18:42]  conditionTemplate.html
│   │   │   │   ├── [ 119 Apr  2 18:42]  ruleImageTemplate.html
│   │   │   │   ├── [3.1K Apr  2 18:42]  ruleTemplate.html
│   │   │   │   ├── [ 765 Apr  2 18:42]  testDataItemTemplate.html
│   │   │   │   ├── [ 738 Apr  2 18:42]  testDataTemplate.html
│   │   │   │   └── [1.8K Apr  2 18:42]  widgetTemplate.html
│   │   │   ├── [4.0K Apr  2 18:36]  src
│   │   │   │   ├── [4.0K Apr  2 18:36]  input
│   │   │   │   │   ├── [2.7K Apr  2 18:42]  ColorPalette.js
│   │   │   │   │   ├── [2.5K Apr  2 18:42]  IconPalette.js
│   │   │   │   │   ├── [3.4K Apr  2 18:42]  KeySelect.js
│   │   │   │   │   ├── [3.0K Apr  2 18:42]  ObjectSelect.js
│   │   │   │   │   ├── [4.2K Apr  2 18:42]  OperationSelect.js
│   │   │   │   │   ├── [6.7K Apr  2 18:42]  Palette.js
│   │   │   │   │   └── [5.0K Apr  2 18:42]  Select.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  telemetry
│   │   │   │   │   ├── [2.4K Apr  2 18:42]  EvaluatorPool.js
│   │   │   │   │   ├── [3.8K Apr  2 18:42]  EvaluatorPoolSpec.js
│   │   │   │   │   ├── [7.1K Apr  2 18:42]  operations.js
│   │   │   │   │   ├── [2.9K Apr  2 18:42]  SummaryWidgetCondition.js
│   │   │   │   │   ├── [5.5K Apr  2 18:42]  SummaryWidgetConditionSpec.js
│   │   │   │   │   ├── [9.7K Apr  2 18:42]  SummaryWidgetEvaluator.js
│   │   │   │   │   ├── [4.0K Apr  2 18:42]  SummaryWidgetMetadataProvider.js
│   │   │   │   │   ├── [2.7K Apr  2 18:42]  SummaryWidgetRule.js
│   │   │   │   │   ├── [5.9K Apr  2 18:42]  SummaryWidgetRuleSpec.js
│   │   │   │   │   ├── [2.5K Apr  2 18:42]  SummaryWidgetTelemetryProvider.js
│   │   │   │   │   └── [ 17K Apr  2 18:42]  SummaryWidgetTelemetryProviderSpec.js
│   │   │   │   ├── [4.0K Apr  2 18:36]  views
│   │   │   │   │   ├── [ 221 Apr  2 18:42]  summary-widget.html
│   │   │   │   │   ├── [3.2K Apr  2 18:42]  SummaryWidgetView.js
│   │   │   │   │   └── [1.2K Apr  2 18:42]  SummaryWidgetViewProvider.js
│   │   │   │   ├── [ 18K Apr  2 18:42]  ConditionEvaluator.js
│   │   │   │   ├── [8.2K Apr  2 18:42]  Condition.js
│   │   │   │   ├── [ 14K Apr  2 18:42]  ConditionManager.js
│   │   │   │   ├── [3.7K Apr  2 18:42]  eventHelpers.js
│   │   │   │   ├── [ 20K Apr  2 18:42]  Rule.js
│   │   │   │   ├── [ 15K Apr  2 18:42]  SummaryWidget.js
│   │   │   │   ├── [6.8K Apr  2 18:42]  TestDataItem.js
│   │   │   │   ├── [6.6K Apr  2 18:42]  TestDataManager.js
│   │   │   │   └── [6.3K Apr  2 18:42]  WidgetDnD.js
│   │   │   ├── [4.0K Apr  2 18:36]  test
│   │   │   │   ├── [4.0K Apr  2 18:36]  input
│   │   │   │   │   ├── [1007 Apr  2 18:42]  ColorPaletteSpec.js
│   │   │   │   │   ├── [ 976 Apr  2 18:42]  IconPaletteSpec.js
│   │   │   │   │   ├── [4.8K Apr  2 18:42]  KeySelectSpec.js
│   │   │   │   │   ├── [4.2K Apr  2 18:42]  ObjectSelectSpec.js
│   │   │   │   │   ├── [5.8K Apr  2 18:42]  OperationSelectSpec.js
│   │   │   │   │   ├── [1.7K Apr  2 18:42]  PaletteSpec.js
│   │   │   │   │   └── [2.1K Apr  2 18:42]  SelectSpec.js
│   │   │   │   ├── [ 14K Apr  2 18:42]  ConditionEvaluatorSpec.js
│   │   │   │   ├── [ 17K Apr  2 18:42]  ConditionManagerSpec.js
│   │   │   │   ├── [8.2K Apr  2 18:42]  ConditionSpec.js
│   │   │   │   ├── [ 10K Apr  2 18:42]  RuleSpec.js
│   │   │   │   ├── [8.7K Apr  2 18:42]  SummaryWidgetSpec.js
│   │   │   │   ├── [2.5K Apr  2 18:42]  SummaryWidgetViewPolicySpec.js
│   │   │   │   ├── [6.3K Apr  2 18:42]  TestDataItemSpec.js
│   │   │   │   ├── [7.6K Apr  2 18:42]  TestDataManagerSpec.js
│   │   │   │   └── [   0 Apr  2 18:42]  WidgetDnDSpec.js
│   │   │   ├── [3.6K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 501 Apr  2 18:42]  README.md
│   │   │   ├── [1.7K Apr  2 18:42]  SummaryWidgetsCompositionPolicy.js
│   │   │   └── [1.7K Apr  2 18:42]  SummaryWidgetViewPolicy.js
│   │   ├── [4.0K Apr  2 18:36]  tabs
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.2K Apr  2 18:42]  tabs.scss
│   │   │   │   └── [ 12K Apr  2 18:42]  tabs.vue
│   │   │   ├── [2.5K Apr  2 18:42]  plugin.js
│   │   │   ├── [6.9K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [3.1K Apr  2 18:42]  tabs.js
│   │   ├── [4.0K Apr  2 18:36]  telemetryMean
│   │   │   ├── [4.0K Apr  2 18:36]  src
│   │   │   │   ├── [4.5K Apr  2 18:42]  MeanTelemetryProvider.js
│   │   │   │   ├── [ 22K Apr  2 18:42]  MeanTelemetryProviderSpec.js
│   │   │   │   ├── [3.4K Apr  2 18:42]  MockTelemetryApi.js
│   │   │   │   └── [4.2K Apr  2 18:42]  TelemetryAverager.js
│   │   │   └── [3.3K Apr  2 18:42]  plugin.js
│   │   ├── [4.0K Apr  2 18:36]  telemetryTable
│   │   │   ├── [4.0K Apr  2 18:36]  collections
│   │   │   │   └── [ 12K Apr  2 18:42]  TableRowCollection.js
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [1.3K Apr  2 18:42]  sizing-row.vue
│   │   │   │   ├── [2.5K Apr  2 18:42]  table-cell.vue
│   │   │   │   ├── [5.6K Apr  2 18:42]  table-column-header.vue
│   │   │   │   ├── [5.9K Apr  2 18:42]  table-configuration.vue
│   │   │   │   ├── [ 542 Apr  2 18:42]  table-footer-indicator.scss
│   │   │   │   ├── [5.6K Apr  2 18:42]  table-footer-indicator.vue
│   │   │   │   ├── [ 388 Apr  2 18:42]  table-row.scss
│   │   │   │   ├── [6.6K Apr  2 18:42]  table-row.vue
│   │   │   │   ├── [5.7K Apr  2 18:42]  table.scss
│   │   │   │   └── [ 39K Apr  2 18:42]  table.vue
│   │   │   ├── [2.1K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 17K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [3.1K Apr  2 18:42]  TableConfigurationViewProvider.js
│   │   │   ├── [2.4K Apr  2 18:42]  TelemetryTableColumn.js
│   │   │   ├── [6.2K Apr  2 18:42]  TelemetryTableConfiguration.js
│   │   │   ├── [ 16K Apr  2 18:42]  TelemetryTable.js
│   │   │   ├── [1.7K Apr  2 18:42]  TelemetryTableNameColumn.js
│   │   │   ├── [3.9K Apr  2 18:42]  TelemetryTableRow.js
│   │   │   ├── [1.6K Apr  2 18:42]  TelemetryTableType.js
│   │   │   ├── [2.1K Apr  2 18:42]  TelemetryTableUnitColumn.js
│   │   │   ├── [1.9K Apr  2 18:42]  TelemetryTableView.js
│   │   │   ├── [2.1K Apr  2 18:42]  TelemetryTableViewProvider.js
│   │   │   └── [3.7K Apr  2 18:42]  ViewActions.js
│   │   ├── [4.0K Apr  2 18:36]  themes
│   │   │   ├── [ 174 Apr  2 18:42]  espresso.js
│   │   │   ├── [ 663 Apr  2 18:42]  espresso-theme.scss
│   │   │   ├── [ 597 Apr  2 18:42]  installTheme.js
│   │   │   ├── [ 170 Apr  2 18:42]  snow.js
│   │   │   └── [ 659 Apr  2 18:42]  snow-theme.scss
│   │   ├── [4.0K Apr  2 18:36]  timeConductor
│   │   │   ├── [4.0K Apr  2 18:36]  independent
│   │   │   │   ├── [8.9K Apr  2 18:42]  IndependentTimeConductor.vue
│   │   │   │   └── [7.8K Apr  2 18:42]  Mode.vue
│   │   │   ├── [1.5K Apr  2 18:42]  conductor-axis.scss
│   │   │   ├── [9.5K Apr  2 18:42]  ConductorAxis.vue
│   │   │   ├── [ 11K Apr  2 18:42]  ConductorHistory.vue
│   │   │   ├── [9.5K Apr  2 18:42]  ConductorInputsFixed.vue
│   │   │   ├── [ 10K Apr  2 18:42]  ConductorInputsRealtime.vue
│   │   │   ├── [3.3K Apr  2 18:42]  conductor-mode-icon.scss
│   │   │   ├── [1.3K Apr  2 18:42]  ConductorModeIcon.vue
│   │   │   ├── [ 245 Apr  2 18:42]  conductor-mode.scss
│   │   │   ├── [6.4K Apr  2 18:42]  ConductorMode.vue
│   │   │   ├── [7.0K Apr  2 18:42]  conductor.scss
│   │   │   ├── [5.0K Apr  2 18:42]  ConductorTimeSystem.vue
│   │   │   ├── [7.8K Apr  2 18:42]  Conductor.vue
│   │   │   ├── [2.0K Apr  2 18:42]  date-picker.scss
│   │   │   ├── [8.0K Apr  2 18:42]  DatePicker.vue
│   │   │   ├── [4.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [6.3K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [5.0K Apr  2 18:42]  timePopup.vue
│   │   │   └── [2.3K Apr  2 18:42]  utcMultiTimeFormat.js
│   │   ├── [4.0K Apr  2 18:36]  timeline
│   │   │   ├── [2.1K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 12K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [2.6K Apr  2 18:42]  TimelineCompositionPolicy.js
│   │   │   ├── [1.7K Apr  2 18:42]  timelineInterceptor.js
│   │   │   ├── [4.6K Apr  2 18:42]  TimelineObjectView.vue
│   │   │   ├── [ 171 Apr  2 18:42]  timeline.scss
│   │   │   ├── [7.0K Apr  2 18:42]  TimelineViewLayout.vue
│   │   │   └── [2.5K Apr  2 18:42]  TimelineViewProvider.js
│   │   ├── [4.0K Apr  2 18:36]  timelist
│   │   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   │   ├── [3.5K Apr  2 18:42]  EventProperties.vue
│   │   │   │   ├── [2.3K Apr  2 18:42]  Filtering.vue
│   │   │   │   ├── [2.7K Apr  2 18:42]  TimeListInspectorViewProvider.js
│   │   │   │   └── [4.7K Apr  2 18:42]  TimelistPropertiesView.vue
│   │   │   ├── [ 472 Apr  2 18:42]  constants.js
│   │   │   ├── [2.7K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 14K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [1.5K Apr  2 18:42]  TimelistCompositionPolicy.js
│   │   │   ├── [1.8K Apr  2 18:42]  timelist.scss
│   │   │   ├── [2.5K Apr  2 18:42]  TimelistViewProvider.js
│   │   │   └── [ 18K Apr  2 18:42]  Timelist.vue
│   │   ├── [4.0K Apr  2 18:36]  timer
│   │   │   ├── [4.0K Apr  2 18:36]  actions
│   │   │   │   ├── [2.5K Apr  2 18:42]  PauseTimerAction.js
│   │   │   │   ├── [2.6K Apr  2 18:42]  RestartTimerAction.js
│   │   │   │   ├── [3.1K Apr  2 18:42]  StartTimerAction.js
│   │   │   │   └── [2.6K Apr  2 18:42]  StopTimerAction.js
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   └── [8.3K Apr  2 18:42]  Timer.vue
│   │   │   ├── [4.6K Apr  2 18:42]  plugin.js
│   │   │   ├── [ 15K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [2.4K Apr  2 18:42]  TimerViewProvider.js
│   │   ├── [4.0K Apr  2 18:36]  URLIndicatorPlugin
│   │   │   ├── [ 788 Apr  2 18:42]  README.md
│   │   │   ├── [4.4K Apr  2 18:42]  URLIndicator.js
│   │   │   ├── [1.6K Apr  2 18:42]  URLIndicatorPlugin.js
│   │   │   └── [6.0K Apr  2 18:42]  URLIndicatorSpec.js
│   │   ├── [4.0K Apr  2 18:36]  URLTimeSettingsSynchronizer
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [5.0K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [8.0K Apr  2 18:42]  URLTimeSettingsSynchronizer.js
│   │   ├── [4.0K Apr  2 18:36]  userIndicator
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   └── [1.6K Apr  2 18:42]  UserIndicator.vue
│   │   │   ├── [2.1K Apr  2 18:42]  plugin.js
│   │   │   └── [3.4K Apr  2 18:42]  pluginSpec.js
│   │   ├── [4.0K Apr  2 18:36]  utcTimeSystem
│   │   │   ├── [ 879 Apr  2 18:42]  DurationFormat.js
│   │   │   ├── [2.3K Apr  2 18:42]  LocalClock.js
│   │   │   ├── [1.8K Apr  2 18:42]  plugin.js
│   │   │   ├── [6.8K Apr  2 18:42]  pluginSpec.js
│   │   │   ├── [3.2K Apr  2 18:42]  UTCTimeFormat.js
│   │   │   └── [1.7K Apr  2 18:42]  UTCTimeSystem.js
│   │   ├── [4.0K Apr  2 18:36]  viewDatumAction
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   ├── [ 504 Apr  2 18:42]  metadata-list.scss
│   │   │   │   └── [ 725 Apr  2 18:42]  MetadataList.vue
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   ├── [2.8K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [2.6K Apr  2 18:42]  ViewDatumAction.js
│   │   ├── [4.0K Apr  2 18:36]  viewLargeAction
│   │   │   ├── [1.4K Apr  2 18:42]  plugin.js
│   │   │   └── [3.2K Apr  2 18:42]  viewLargeAction.js
│   │   ├── [4.0K Apr  2 18:36]  webPage
│   │   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   │   └── [ 460 Apr  2 18:42]  WebPage.vue
│   │   │   ├── [1.9K Apr  2 18:42]  plugin.js
│   │   │   ├── [3.4K Apr  2 18:42]  pluginSpec.js
│   │   │   └── [2.3K Apr  2 18:42]  WebPageViewProvider.js
│   │   └── [7.8K Apr  2 18:42]  plugins.js
│   ├── [4.0K Apr  2 18:36]  selection
│   │   └── [7.5K Apr  2 18:42]  Selection.js
│   ├── [4.0K Apr  2 18:36]  styles
│   │   ├── [4.0K Apr  2 18:36]  fonts
│   │   │   ├── [6.6K Apr  2 18:42]  Open MCT Symbols 12px.json
│   │   │   ├── [2.1K Apr  2 18:42]  Open-MCT-Symbols-12px.ttf
│   │   │   ├── [2.2K Apr  2 18:42]  Open-MCT-Symbols-12px.woff
│   │   │   ├── [147K Apr  2 18:42]  Open MCT Symbols 16px.json
│   │   │   ├── [ 70K Apr  2 18:42]  Open-MCT-Symbols-16px.svg
│   │   │   ├── [ 26K Apr  2 18:42]  Open-MCT-Symbols-16px.ttf
│   │   │   └── [ 26K Apr  2 18:42]  Open-MCT-Symbols-16px.woff
│   │   ├── [4.0K Apr  2 18:36]  vendor
│   │   │   └── [2.4K Apr  2 18:42]  normalize-min.scss
│   │   ├── [3.2K Apr  2 18:42]  _about.scss
│   │   ├── [2.1K Apr  2 18:42]  _animations.scss
│   │   ├── [ 18K Apr  2 18:42]  _constants-espresso.scss
│   │   ├── [ 18K Apr  2 18:42]  _constants-maelstrom.scss
│   │   ├── [4.4K Apr  2 18:42]  _constants-mobile.scss
│   │   ├── [ 37K Apr  2 18:42]  _constants.scss
│   │   ├── [ 18K Apr  2 18:42]  _constants-snow.scss
│   │   ├── [ 26K Apr  2 18:42]  _controls.scss
│   │   ├── [ 10K Apr  2 18:42]  _forms.scss
│   │   ├── [9.0K Apr  2 18:42]  _global.scss
│   │   ├── [ 17K Apr  2 18:42]  _glyphs.scss
│   │   ├── [3.7K Apr  2 18:42]  _legacy-messages.scss
│   │   ├── [ 20K Apr  2 18:42]  _legacy-plots.scss
│   │   ├── [ 29K Apr  2 18:42]  _legacy.scss
│   │   ├── [6.4K Apr  2 18:42]  _limits.scss
│   │   ├── [ 20K Apr  2 18:42]  _mixins.scss
│   │   ├── [ 17K Apr  2 18:42]  notebook.scss
│   │   ├── [2.1K Apr  2 18:42]  plotly.scss
│   │   ├── [6.2K Apr  2 18:42]  _status.scss
│   │   ├── [6.3K Apr  2 18:42]  _table.scss
│   │   └── [3.2K Apr  2 18:42]  vue-styles.scss
│   ├── [4.0K Apr  2 18:36]  tools
│   │   ├── [2.8K Apr  2 18:42]  url.js
│   │   └── [2.6K Apr  2 18:42]  urlSpec.js
│   ├── [4.0K Apr  2 18:36]  ui
│   │   ├── [4.0K Apr  2 18:36]  color
│   │   │   ├── [2.1K Apr  2 18:42]  ColorHelper.js
│   │   │   ├── [3.0K Apr  2 18:42]  Color.js
│   │   │   ├── [2.8K Apr  2 18:42]  ColorPalette.js
│   │   │   └── [4.8K Apr  2 18:42]  ColorSwatch.vue
│   │   ├── [4.0K Apr  2 18:36]  components
│   │   │   ├── [4.0K Apr  2 18:36]  List
│   │   │   │   ├── [1011 Apr  2 18:42]  ListHeader.vue
│   │   │   │   ├── [1.2K Apr  2 18:42]  ListItem.vue
│   │   │   │   ├── [ 762 Apr  2 18:42]  list-view.scss
│   │   │   │   └── [3.8K Apr  2 18:42]  ListView.vue
│   │   │   ├── [4.0K Apr  2 18:36]  swim-lane
│   │   │   │   ├── [1.9K Apr  2 18:42]  swimlane.scss
│   │   │   │   └── [3.6K Apr  2 18:42]  SwimLane.vue
│   │   │   ├── [1.4K Apr  2 18:42]  components.js
│   │   │   ├── [ 224 Apr  2 18:42]  COMPONENTS.md
│   │   │   ├── [1.7K Apr  2 18:42]  componentsSpec.js
│   │   │   ├── [ 354 Apr  2 18:42]  contextMenuDropDown.vue
│   │   │   ├── [3.8K Apr  2 18:42]  object-frame.scss
│   │   │   ├── [7.9K Apr  2 18:42]  ObjectFrame.vue
│   │   │   ├── [2.0K Apr  2 18:42]  object-label.scss
│   │   │   ├── [3.6K Apr  2 18:42]  ObjectLabel.vue
│   │   │   ├── [4.1K Apr  2 18:42]  ObjectPath.vue
│   │   │   ├── [ 16K Apr  2 18:42]  ObjectView.vue
│   │   │   ├── [ 599 Apr  2 18:42]  progress-bar.scss
│   │   │   ├── [ 754 Apr  2 18:42]  ProgressBar.vue
│   │   │   ├── [1.7K Apr  2 18:42]  search.scss
│   │   │   ├── [1.4K Apr  2 18:42]  search.vue
│   │   │   ├── [ 856 Apr  2 18:42]  timesystem-axis.scss
│   │   │   ├── [5.0K Apr  2 18:42]  TimeSystemAxis.vue
│   │   │   ├── [1.5K Apr  2 18:42]  toggle-switch.scss
│   │   │   ├── [1.0K Apr  2 18:42]  ToggleSwitch.vue
│   │   │   └── [ 875 Apr  2 18:42]  viewControl.vue
│   │   ├── [4.0K Apr  2 18:36]  inspector
│   │   │   ├── [5.6K Apr  2 18:42]  InspectorDetailsSpec.js
│   │   │   ├── [6.0K Apr  2 18:42]  inspector.scss
│   │   │   ├── [9.2K Apr  2 18:42]  InspectorStylesSpec.js
│   │   │   ├── [6.7K Apr  2 18:42]  InspectorStylesSpecMocks.js
│   │   │   ├── [3.3K Apr  2 18:42]  InspectorTabs.vue
│   │   │   ├── [2.7K Apr  2 18:42]  InspectorViews.vue
│   │   │   ├── [2.3K Apr  2 18:42]  Inspector.vue
│   │   │   └── [5.3K Apr  2 18:42]  ObjectName.vue
│   │   ├── [4.0K Apr  2 18:36]  layout
│   │   │   ├── [4.0K Apr  2 18:36]  assets
│   │   │   │   └── [4.0K Apr  2 18:36]  images
│   │   │   │       ├── [119K Apr  2 18:42]  bg-splash.jpg
│   │   │   │       ├── [ 12K Apr  2 18:42]  logo-nasa.svg
│   │   │   │       ├── [2.4K Apr  2 18:42]  logo-openmct-shdw.svg
│   │   │   │       └── [1.9K Apr  2 18:42]  logo-openmct.svg
│   │   │   ├── [4.0K Apr  2 18:36]  search
│   │   │   │   ├── [7.5K Apr  2 18:42]  AnnotationSearchResult.vue
│   │   │   │   ├── [ 12K Apr  2 18:42]  GrandSearchSpec.js
│   │   │   │   ├── [7.8K Apr  2 18:42]  GrandSearch.vue
│   │   │   │   ├── [4.6K Apr  2 18:42]  ObjectSearchResult.vue
│   │   │   │   ├── [5.0K Apr  2 18:42]  SearchResultsDropDown.vue
│   │   │   │   └── [3.4K Apr  2 18:42]  search.scss
│   │   │   ├── [4.0K Apr  2 18:36]  status-bar
│   │   │   │   ├── [3.6K Apr  2 18:42]  indicators.scss
│   │   │   │   ├── [1.5K Apr  2 18:42]  Indicators.vue
│   │   │   │   ├── [1.6K Apr  2 18:42]  notification-banner.scss
│   │   │   │   └── [6.5K Apr  2 18:42]  NotificationBanner.vue
│   │   │   ├── [2.5K Apr  2 18:42]  AboutDialog.vue
│   │   │   ├── [ 150 Apr  2 18:42]  app-logo.scss
│   │   │   ├── [2.0K Apr  2 18:42]  AppLogo.vue
│   │   │   ├── [ 13K Apr  2 18:42]  BrowseBar.vue
│   │   │   ├── [ 452 Apr  2 18:42]  create-button.scss
│   │   │   ├── [2.2K Apr  2 18:42]  CreateButton.vue
│   │   │   ├── [ 13K Apr  2 18:42]  layout.scss
│   │   │   ├── [5.4K Apr  2 18:42]  LayoutSpec.js
│   │   │   ├── [9.6K Apr  2 18:42]  Layout.vue
│   │   │   ├── [6.2K Apr  2 18:42]  mct-tree.scss
│   │   │   ├── [ 37K Apr  2 18:42]  mct-tree.vue
│   │   │   ├── [ 479 Apr  2 18:42]  multipane.vue
│   │   │   ├── [8.8K Apr  2 18:42]  pane.scss
│   │   │   ├── [6.9K Apr  2 18:42]  pane.vue
│   │   │   ├── [4.6K Apr  2 18:42]  RecentObjectsListItem.vue
│   │   │   ├── [8.7K Apr  2 18:42]  RecentObjectsList.vue
│   │   │   ├── [2.8K Apr  2 18:42]  recent-objects.scss
│   │   │   ├── [5.8K Apr  2 18:42]  tree-item.vue
│   │   │   └── [1.1K Apr  2 18:42]  ViewSwitcher.vue
│   │   ├── [4.0K Apr  2 18:36]  mixins
│   │   │   ├── [1.8K Apr  2 18:42]  context-menu-gesture.js
│   │   │   ├── [ 573 Apr  2 18:42]  object-link.js
│   │   │   ├── [2.8K Apr  2 18:42]  staleness-mixin.js
│   │   │   └── [ 894 Apr  2 18:42]  toggle-mixin.js
│   │   ├── [4.0K Apr  2 18:36]  preview
│   │   │   ├── [1.5K Apr  2 18:42]  plugin.js
│   │   │   ├── [3.3K Apr  2 18:42]  PreviewAction.js
│   │   │   ├── [4.9K Apr  2 18:42]  preview-header.vue
│   │   │   ├── [ 518 Apr  2 18:42]  preview.scss
│   │   │   ├── [7.8K Apr  2 18:42]  Preview.vue
│   │   │   └── [1.8K Apr  2 18:42]  ViewHistoricalDataAction.js
│   │   ├── [4.0K Apr  2 18:36]  registries
│   │   │   ├── [5.1K Apr  2 18:42]  InspectorViewRegistry.js
│   │   │   ├── [4.1K Apr  2 18:42]  ToolbarRegistry.js
│   │   │   └── [ 10K Apr  2 18:42]  ViewRegistry.js
│   │   ├── [4.0K Apr  2 18:36]  router
│   │   │   ├── [ 12K Apr  2 18:42]  ApplicationRouter.js
│   │   │   ├── [3.4K Apr  2 18:42]  ApplicationRouterSpec.js
│   │   │   └── [5.3K Apr  2 18:42]  Browse.js
│   │   └── [4.0K Apr  2 18:36]  toolbar
│   │       ├── [4.0K Apr  2 18:36]  components
│   │       │   ├── [1.8K Apr  2 18:42]  toolbar-button.vue
│   │       │   ├── [ 929 Apr  2 18:42]  toolbar-checkbox.scss
│   │       │   ├── [ 844 Apr  2 18:42]  toolbar-checkbox.vue
│   │       │   ├── [4.8K Apr  2 18:42]  toolbar-color-picker.vue
│   │       │   ├── [1.4K Apr  2 18:42]  toolbar-input.vue
│   │       │   ├── [1.2K Apr  2 18:42]  toolbar-menu.vue
│   │       │   ├── [1.7K Apr  2 18:42]  toolbar-select-menu.vue
│   │       │   ├── [ 205 Apr  2 18:42]  toolbar-separator.vue
│   │       │   └── [1.2K Apr  2 18:42]  toolbar-toggle-button.vue
│   │       └── [ 10K Apr  2 18:42]  Toolbar.vue
│   ├── [4.0K Apr  2 18:36]  utils
│   │   ├── [4.0K Apr  2 18:36]  agent
│   │   │   ├── [4.8K Apr  2 18:42]  Agent.js
│   │   │   └── [4.8K Apr  2 18:42]  AgentSpec.js
│   │   ├── [4.0K Apr  2 18:36]  clock
│   │   │   ├── [2.8K Apr  2 18:42]  DefaultClock.js
│   │   │   └── [2.9K Apr  2 18:42]  Ticker.js
│   │   ├── [4.0K Apr  2 18:36]  template
│   │   │   ├── [ 419 Apr  2 18:42]  templateHelpers.js
│   │   │   └── [5.8K Apr  2 18:42]  templateHelpersSpec.js
│   │   ├── [4.0K Apr  2 18:36]  testing
│   │   │   └── [ 818 Apr  2 18:42]  mockLocalStorage.js
│   │   ├── [4.0K Apr  2 18:36]  textHighlight
│   │   │   └── [2.2K Apr  2 18:42]  TextHighlight.vue
│   │   ├── [ 273 Apr  2 18:42]  clipboard.js
│   │   ├── [2.8K Apr  2 18:42]  duration.js
│   │   ├── [ 284 Apr  2 18:42]  raf.js
│   │   ├── [2.0K Apr  2 18:42]  rafSpec.js
│   │   ├── [2.7K Apr  2 18:42]  staleness.js
│   │   └── [9.8K Apr  2 18:42]  testing.js
│   ├── [ 14K Apr  2 18:42]  MCT.js
│   └── [4.3K Apr  2 18:42]  MCTSpec.js
├── [4.0K Apr  2 18:40]  node_modules
│   ├── [4.0K Apr  2 18:40]  @babel
│   │   └── [ 103 Apr  2 18:40]  eslint-parser -> ../.pnpm/@babel+eslint-parser@7.21.3_@babel+core@7.21.4_eslint@8.37.0/node_modules/@babel/eslint-parser
│   ├── [  84 Apr  2 18:40]  babel-loader -> .pnpm/babel-loader@9.1.2_@babel+core@7.21.4_webpack@5.77.0/node_modules/babel-loader
│   ├── [  68 Apr  2 18:40]  babel-plugin-istanbul -> .pnpm/babel-plugin-istanbul@6.1.1/node_modules/babel-plugin-istanbul
│   ├── [4.0K Apr  2 18:40]  @braintree
│   │   └── [  75 Apr  2 18:40]  sanitize-url -> ../.pnpm/@braintree+sanitize-url@6.0.2/node_modules/@braintree/sanitize-url
│   ├── [  70 Apr  2 18:40]  comma-separated-values -> .pnpm/comma-separated-values@3.6.4/node_modules/comma-separated-values
│   ├── [  80 Apr  2 18:40]  copy-webpack-plugin -> .pnpm/copy-webpack-plugin@11.0.0_webpack@5.77.0/node_modules/copy-webpack-plugin
│   ├── [  61 Apr  2 18:40]  css-loader -> .pnpm/css-loader@6.7.3_webpack@5.77.0/node_modules/css-loader
│   ├── [  40 Apr  2 18:40]  d3-axis -> .pnpm/d3-axis@3.0.0/node_modules/d3-axis
│   ├── [  42 Apr  2 18:40]  d3-color -> .pnpm/d3-color@3.1.0/node_modules/d3-color
│   ├── [  42 Apr  2 18:40]  d3-scale -> .pnpm/d3-scale@3.3.0/node_modules/d3-scale
│   ├── [  50 Apr  2 18:40]  d3-selection -> .pnpm/d3-selection@3.0.0/node_modules/d3-selection
│   ├── [4.0K Apr  2 18:40]  @eslint
│   │   ├── [  61 Apr  2 18:40]  eslintrc -> ../.pnpm/@eslint+eslintrc@2.0.2/node_modules/@eslint/eslintrc
│   │   └── [  50 Apr  2 18:40]  js -> ../.pnpm/@eslint+js@8.37.0/node_modules/@eslint/js
│   ├── [  39 Apr  2 18:40]  eslint -> .pnpm/eslint@8.37.0/node_modules/eslint
│   ├── [4.0K Apr  2 18:40]  @eslint-community
│   │   ├── [ 103 Apr  2 18:40]  eslint-utils -> ../.pnpm/@eslint-community+eslint-utils@4.4.0_eslint@8.37.0/node_modules/@eslint-community/eslint-utils
│   │   └── [  79 Apr  2 18:40]  regexpp -> ../.pnpm/@eslint-community+regexpp@4.5.0/node_modules/@eslint-community/regexpp
│   ├── [  80 Apr  2 18:40]  eslint-plugin-compat -> .pnpm/eslint-plugin-compat@4.1.2_eslint@8.37.0/node_modules/eslint-plugin-compat
│   ├── [  89 Apr  2 18:40]  eslint-plugin-playwright -> .pnpm/eslint-plugin-playwright@0.12.0_eslint@8.37.0/node_modules/eslint-plugin-playwright
│   ├── [  75 Apr  2 18:40]  eslint-plugin-vue -> .pnpm/eslint-plugin-vue@9.10.0_eslint@8.37.0/node_modules/eslint-plugin-vue
│   ├── [ 117 Apr  2 18:40]  eslint-plugin-you-dont-need-lodash-underscore -> .pnpm/eslint-plugin-you-dont-need-lodash-underscore@6.12.0/node_modules/eslint-plugin-you-dont-need-lodash-underscore
│   ├── [  50 Apr  2 18:40]  eslint-scope -> .pnpm/eslint-scope@7.1.1/node_modules/eslint-scope
│   ├── [  64 Apr  2 18:40]  eslint-visitor-keys -> .pnpm/eslint-visitor-keys@2.1.0/node_modules/eslint-visitor-keys
│   ├── [  52 Apr  2 18:40]  eventemitter3 -> .pnpm/eventemitter3@1.2.0/node_modules/eventemitter3
│   ├── [  46 Apr  2 18:40]  file-saver -> .pnpm/file-saver@2.0.5/node_modules/file-saver
│   ├── [  50 Apr  2 18:40]  git-rev-sync -> .pnpm/git-rev-sync@3.0.2/node_modules/git-rev-sync
│   ├── [  48 Apr  2 18:40]  html2canvas -> .pnpm/html2canvas@1.4.1/node_modules/html2canvas
│   ├── [  69 Apr  2 18:40]  imports-loader -> .pnpm/imports-loader@4.0.1_webpack@5.77.0/node_modules/imports-loader
│   ├── [  50 Apr  2 18:40]  jasmine-core -> .pnpm/jasmine-core@4.6.0/node_modules/jasmine-core
│   ├── [  36 Apr  2 18:40]  karma -> .pnpm/karma@6.4.1/node_modules/karma
│   ├── [  68 Apr  2 18:40]  karma-chrome-launcher -> .pnpm/karma-chrome-launcher@3.1.1/node_modules/karma-chrome-launcher
│   ├── [  44 Apr  2 18:40]  karma-cli -> .pnpm/karma-cli@2.0.0/node_modules/karma-cli
│   ├── [  54 Apr  2 18:40]  karma-coverage -> .pnpm/karma-coverage@2.2.0/node_modules/karma-coverage
│   ├── [  90 Apr  2 18:40]  karma-coverage-istanbul-reporter -> .pnpm/karma-coverage-istanbul-reporter@3.0.3/node_modules/karma-coverage-istanbul-reporter
│   ├── [  64 Apr  2 18:40]  karma-jasmine -> .pnpm/karma-jasmine@5.1.0_karma@6.4.1/node_modules/karma-jasmine
│   ├── [  78 Apr  2 18:40]  karma-junit-reporter -> .pnpm/karma-junit-reporter@2.0.1_karma@6.4.1/node_modules/karma-junit-reporter
│   ├── [  70 Apr  2 18:40]  karma-sourcemap-loader -> .pnpm/karma-sourcemap-loader@0.4.0/node_modules/karma-sourcemap-loader
│   ├── [  77 Apr  2 18:40]  karma-spec-reporter -> .pnpm/karma-spec-reporter@0.0.36_karma@6.4.1/node_modules/karma-spec-reporter
│   ├── [  67 Apr  2 18:40]  karma-webpack -> .pnpm/karma-webpack@5.0.0_webpack@5.77.0/node_modules/karma-webpack
│   ├── [  38 Apr  2 18:40]  kdbush -> .pnpm/kdbush@3.0.0/node_modules/kdbush
│   ├── [  50 Apr  2 18:40]  location-bar -> .pnpm/location-bar@3.0.1/node_modules/location-bar
│   ├── [  40 Apr  2 18:40]  lodash -> .pnpm/lodash@4.17.21/node_modules/lodash
│   ├── [  87 Apr  2 18:40]  mini-css-extract-plugin -> .pnpm/mini-css-extract-plugin@2.7.5_webpack@5.77.0/node_modules/mini-css-extract-plugin
│   ├── [  39 Apr  2 18:40]  moment -> .pnpm/moment@2.29.4/node_modules/moment
│   ├── [  70 Apr  2 18:40]  moment-duration-format -> .pnpm/moment-duration-format@2.3.2/node_modules/moment-duration-format
│   ├── [  57 Apr  2 18:40]  moment-timezone -> .pnpm/moment-timezone@0.5.41/node_modules/moment-timezone
│   ├── [4.0K Apr  2 18:40]  @nicolo-ribaudo
│   │   └── [ 112 Apr  2 18:40]  eslint-scope-5-internals -> ../.pnpm/@nicolo-ribaudo+eslint-scope-5-internals@5.1.1-v1/node_modules/@nicolo-ribaudo/eslint-scope-5-internals
│   ├── [  33 Apr  2 18:40]  nyc -> .pnpm/nyc@15.1.0/node_modules/nyc
│   ├── [  45 Apr  2 18:40]  painterro -> .pnpm/painterro@1.2.78/node_modules/painterro
│   ├── [4.0K Apr  2 18:40]  @percy
│   │   ├── [  50 Apr  2 18:40]  cli -> ../.pnpm/@percy+cli@1.21.0/node_modules/@percy/cli
│   │   └── [  86 Apr  2 18:40]  playwright -> ../.pnpm/@percy+playwright@1.0.4_playwright-core@1.32.1/node_modules/@percy/playwright
│   ├── [4.0K Apr  2 18:40]  @playwright
│   │   └── [  62 Apr  2 18:40]  test -> ../.pnpm/@playwright+test@1.32.1/node_modules/@playwright/test
│   ├── [  57 Apr  2 18:40]  playwright-core -> .pnpm/playwright-core@1.32.1/node_modules/playwright-core
│   ├── [  67 Apr  2 18:40]  plotly.js-basic-dist -> .pnpm/plotly.js-basic-dist@2.20.0/node_modules/plotly.js-basic-dist
│   ├── [  65 Apr  2 18:40]  plotly.js-gl2d-dist -> .pnpm/plotly.js-gl2d-dist@2.20.0/node_modules/plotly.js-gl2d-dist
│   ├── [  42 Apr  2 18:40]  prettier -> .pnpm/prettier@2.8.7/node_modules/prettier
│   ├── [  38 Apr  2 18:40]  printj -> .pnpm/printj@1.3.1/node_modules/printj
│   ├── [  62 Apr  2 18:40]  resolve-url-loader -> .pnpm/resolve-url-loader@5.0.0/node_modules/resolve-url-loader
│   ├── [  53 Apr  2 18:40]  sanitize-html -> .pnpm/sanitize-html@2.10.0/node_modules/sanitize-html
│   ├── [  35 Apr  2 18:40]  sass -> .pnpm/sass@1.60.0/node_modules/sass
│   ├── [  76 Apr  2 18:40]  sass-loader -> .pnpm/sass-loader@13.2.2_sass@1.60.0_webpack@5.77.0/node_modules/sass-loader
│   ├── [  37 Apr  2 18:40]  sinon -> .pnpm/sinon@15.0.3/node_modules/sinon
│   ├── [  65 Apr  2 18:40]  style-loader -> .pnpm/style-loader@3.3.2_webpack@5.77.0/node_modules/style-loader
│   ├── [  50 Apr  2 18:40]  tap -> .pnpm/tap@16.3.4_typescript@4.9.5/node_modules/tap
│   ├── [4.0K Apr  2 18:40]  @types
│   │   ├── [  56 Apr  2 18:40]  eslint -> ../.pnpm/@types+eslint@8.37.0/node_modules/@types/eslint
│   │   ├── [  67 Apr  2 18:40]  eslint-scope -> ../.pnpm/@types+eslint-scope@3.7.4/node_modules/@types/eslint-scope
│   │   ├── [  69 Apr  2 18:40]  eventemitter3 -> ../.pnpm/@types+eventemitter3@1.2.0/node_modules/@types/eventemitter3
│   │   ├── [  57 Apr  2 18:40]  jasmine -> ../.pnpm/@types+jasmine@4.3.1/node_modules/@types/jasmine
│   │   └── [  58 Apr  2 18:40]  lodash -> ../.pnpm/@types+lodash@4.14.192/node_modules/@types/lodash
│   ├── [  46 Apr  2 18:40]  typescript -> .pnpm/typescript@4.9.5/node_modules/typescript
│   ├── [  34 Apr  2 18:40]  uuid -> .pnpm/uuid@9.0.0/node_modules/uuid
│   ├── [  33 Apr  2 18:40]  vue -> .pnpm/vue@2.6.14/node_modules/vue
│   ├── [  74 Apr  2 18:40]  vue-eslint-parser -> .pnpm/vue-eslint-parser@9.1.1_eslint@8.37.0/node_modules/vue-eslint-parser
│   ├── [ 123 Apr  2 18:40]  vue-loader -> .pnpm/vue-loader@15.9.8_css-loader@6.7.3_lodash@4.17.21_vue-template-compiler@2.6.14_webpack@5.77.0/node_modules/vue-loader
│   ├── [  69 Apr  2 18:40]  vue-template-compiler -> .pnpm/vue-template-compiler@2.6.14/node_modules/vue-template-compiler
│   ├── [  59 Apr  2 18:40]  webpack -> .pnpm/webpack@5.77.0_webpack-cli@5.0.1/node_modules/webpack
│   ├── [  89 Apr  2 18:40]  webpack-cli -> .pnpm/webpack-cli@5.0.1_webpack-dev-server@4.13.2_webpack@5.77.0/node_modules/webpack-cli
│   ├── [  96 Apr  2 18:40]  webpack-dev-server -> .pnpm/webpack-dev-server@4.13.2_webpack-cli@5.0.1_webpack@5.77.0/node_modules/webpack-dev-server
│   ├── [  52 Apr  2 18:40]  webpack-merge -> .pnpm/webpack-merge@5.8.0/node_modules/webpack-merge
│   └── [  37 Apr  2 18:40]  yargs -> .pnpm/yargs@17.7.1/node_modules/yargs
├── [4.0K Apr  2 18:41]  dist
│   ├── [4.0K Apr  2 18:40]  favicons
│   │   ├── [ 348 Apr  2 18:42]  favicon-16x16.png
│   │   ├── [ 628 Apr  2 18:42]  favicon-32x32.png
│   │   └── [1.6K Apr  2 18:42]  favicon-96x96.png
│   ├── [4.0K Apr  2 18:40]  fonts
│   │   ├── [2.1K Apr  2 18:42]  Open-MCT-Symbols-12px.ttf
│   │   ├── [2.2K Apr  2 18:42]  Open-MCT-Symbols-12px.woff
│   │   ├── [ 26K Apr  2 18:42]  Open-MCT-Symbols-16px.ttf
│   │   └── [ 26K Apr  2 18:42]  Open-MCT-Symbols-16px.woff
│   ├── [4.0K Apr  2 18:40]  imagery
│   │   ├── [8.4K Apr  2 18:42]  example-imagery-layer-16x9.png
│   │   ├── [9.0K Apr  2 18:42]  example-imagery-layer-safe.png
│   │   └── [ 11K Apr  2 18:42]  example-imagery-layer-scale.png
│   ├── [4.0K Apr  2 18:40]  images
│   │   ├── [119K Apr  2 18:42]  bg-splash.jpg
│   │   ├── [ 12K Apr  2 18:42]  logo-nasa.svg
│   │   ├── [2.4K Apr  2 18:42]  logo-openmct-shdw.svg
│   │   └── [1.9K Apr  2 18:42]  logo-openmct.svg
│   ├── [4.0K Apr  2 18:41]  src
│   │   ├── [4.0K Apr  2 18:41]  api
│   │   │   ├── [4.0K Apr  2 18:41]  actions
│   │   │   │   ├── [ 776 Apr  2 18:42]  ActionCollection.d.ts
│   │   │   │   ├── [ 383 Apr  2 18:42]  ActionCollection.d.ts.map
│   │   │   │   ├── [ 850 Apr  2 18:42]  ActionsAPI.d.ts
│   │   │   │   └── [ 324 Apr  2 18:42]  ActionsAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  annotation
│   │   │   │   ├── [7.3K Apr  2 18:42]  AnnotationAPI.d.ts
│   │   │   │   └── [ 921 Apr  2 18:42]  AnnotationAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  composition
│   │   │   │   ├── [3.5K Apr  2 18:42]  CompositionAPI.d.ts
│   │   │   │   ├── [ 709 Apr  2 18:42]  CompositionAPI.d.ts.map
│   │   │   │   ├── [5.7K Apr  2 18:42]  CompositionCollection.d.ts
│   │   │   │   ├── [1023 Apr  2 18:42]  CompositionCollection.d.ts.map
│   │   │   │   ├── [4.8K Apr  2 18:42]  CompositionProvider.d.ts
│   │   │   │   ├── [ 900 Apr  2 18:42]  CompositionProvider.d.ts.map
│   │   │   │   ├── [1.3K Apr  2 18:42]  DefaultCompositionProvider.d.ts
│   │   │   │   └── [ 363 Apr  2 18:42]  DefaultCompositionProvider.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  faultmanagement
│   │   │   │   ├── [2.9K Apr  2 18:42]  FaultManagementAPI.d.ts
│   │   │   │   └── [ 753 Apr  2 18:42]  FaultManagementAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  forms
│   │   │   │   ├── [ 654 Apr  2 18:42]  FormController.d.ts
│   │   │   │   ├── [ 273 Apr  2 18:42]  FormController.d.ts.map
│   │   │   │   ├── [6.8K Apr  2 18:42]  FormsAPI.d.ts
│   │   │   │   ├── [ 617 Apr  2 18:42]  FormsAPI.d.ts.map
│   │   │   │   ├── [ 247 Apr  2 18:42]  toggle-check-box-mixin.d.ts
│   │   │   │   └── [ 180 Apr  2 18:42]  toggle-check-box-mixin.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  indicators
│   │   │   │   ├── [1.2K Apr  2 18:42]  IndicatorAPI.d.ts
│   │   │   │   ├── [ 252 Apr  2 18:42]  IndicatorAPI.d.ts.map
│   │   │   │   ├── [ 528 Apr  2 18:42]  SimpleIndicator.d.ts
│   │   │   │   └── [ 341 Apr  2 18:42]  SimpleIndicator.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  menu
│   │   │   │   ├── [3.4K Apr  2 18:42]  MenuAPI.d.ts
│   │   │   │   ├── [ 483 Apr  2 18:42]  MenuAPI.d.ts.map
│   │   │   │   ├── [ 826 Apr  2 18:42]  menu.d.ts
│   │   │   │   └── [ 288 Apr  2 18:42]  menu.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  notifications
│   │   │   │   ├── [7.2K Apr  2 18:42]  NotificationAPI.d.ts
│   │   │   │   └── [ 970 Apr  2 18:42]  NotificationAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  objects
│   │   │   │   ├── [  96 Apr  2 18:42]  ConflictError.d.ts
│   │   │   │   ├── [ 150 Apr  2 18:42]  ConflictError.d.ts.map
│   │   │   │   ├── [4.1K Apr  2 18:42]  InMemorySearchProvider.d.ts
│   │   │   │   ├── [ 905 Apr  2 18:42]  InMemorySearchProvider.d.ts.map
│   │   │   │   ├── [  50 Apr  2 18:42]  InMemorySearchWorker.d.ts
│   │   │   │   ├── [ 155 Apr  2 18:42]  InMemorySearchWorker.d.ts.map
│   │   │   │   ├── [1.2K Apr  2 18:42]  InterceptorRegistry.d.ts
│   │   │   │   ├── [ 242 Apr  2 18:42]  InterceptorRegistry.d.ts.map
│   │   │   │   ├── [1.9K Apr  2 18:42]  MutableDomainObject.d.ts
│   │   │   │   ├── [ 291 Apr  2 18:42]  MutableDomainObject.d.ts.map
│   │   │   │   ├── [ 16K Apr  2 18:42]  ObjectAPI.d.ts
│   │   │   │   ├── [1.6K Apr  2 18:42]  ObjectAPI.d.ts.map
│   │   │   │   ├── [  42 Apr  2 18:42]  object-utils.d.ts
│   │   │   │   ├── [ 139 Apr  2 18:42]  object-utils.d.ts.map
│   │   │   │   ├── [1.8K Apr  2 18:42]  RootObjectProvider.d.ts
│   │   │   │   ├── [ 280 Apr  2 18:42]  RootObjectProvider.d.ts.map
│   │   │   │   ├── [ 261 Apr  2 18:42]  RootRegistry.d.ts
│   │   │   │   ├── [ 218 Apr  2 18:42]  RootRegistry.d.ts.map
│   │   │   │   ├── [1.5K Apr  2 18:42]  Transaction.d.ts
│   │   │   │   └── [ 278 Apr  2 18:42]  Transaction.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  overlays
│   │   │   │   ├── [ 354 Apr  2 18:42]  Dialog.d.ts
│   │   │   │   ├── [ 155 Apr  2 18:42]  Dialog.d.ts.map
│   │   │   │   ├── [3.3K Apr  2 18:42]  OverlayAPI.d.ts
│   │   │   │   ├── [ 354 Apr  2 18:42]  OverlayAPI.d.ts.map
│   │   │   │   ├── [ 695 Apr  2 18:42]  Overlay.d.ts
│   │   │   │   ├── [ 252 Apr  2 18:42]  Overlay.d.ts.map
│   │   │   │   ├── [ 524 Apr  2 18:42]  ProgressDialog.d.ts
│   │   │   │   └── [ 184 Apr  2 18:42]  ProgressDialog.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  priority
│   │   │   │   ├── [1.3K Apr  2 18:42]  PriorityAPI.d.ts
│   │   │   │   └── [ 184 Apr  2 18:42]  PriorityAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  status
│   │   │   │   ├── [ 313 Apr  2 18:42]  StatusAPI.d.ts
│   │   │   │   └── [ 223 Apr  2 18:42]  StatusAPI.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  telemetry
│   │   │   │   ├── [1.5K Apr  2 18:42]  constants.d.ts
│   │   │   │   ├── [ 205 Apr  2 18:42]  constants.d.ts.map
│   │   │   │   ├── [  53 Apr  2 18:42]  DefaultMetadataProvider.d.ts
│   │   │   │   ├── [ 163 Apr  2 18:42]  DefaultMetadataProvider.d.ts.map
│   │   │   │   ├── [ 12K Apr  2 18:42]  TelemetryAPI.d.ts
│   │   │   │   ├── [1.2K Apr  2 18:42]  TelemetryAPI.d.ts.map
│   │   │   │   ├── [3.9K Apr  2 18:42]  TelemetryCollection.d.ts
│   │   │   │   ├── [ 818 Apr  2 18:42]  TelemetryCollection.d.ts.map
│   │   │   │   ├── [  54 Apr  2 18:42]  TelemetryMetadataManager.d.ts
│   │   │   │   ├── [ 165 Apr  2 18:42]  TelemetryMetadataManager.d.ts.map
│   │   │   │   ├── [2.5K Apr  2 18:42]  TelemetryRequestInterceptor.d.ts
│   │   │   │   ├── [ 292 Apr  2 18:42]  TelemetryRequestInterceptor.d.ts.map
│   │   │   │   ├── [  53 Apr  2 18:42]  TelemetryValueFormatter.d.ts
│   │   │   │   └── [ 163 Apr  2 18:42]  TelemetryValueFormatter.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  time
│   │   │   │   ├── [1.2K Apr  2 18:42]  GlobalTimeContext.d.ts
│   │   │   │   ├── [ 249 Apr  2 18:42]  GlobalTimeContext.d.ts.map
│   │   │   │   ├── [2.4K Apr  2 18:42]  IndependentTimeContext.d.ts
│   │   │   │   ├── [ 473 Apr  2 18:42]  IndependentTimeContext.d.ts.map
│   │   │   │   ├── [6.6K Apr  2 18:42]  TimeAPI.d.ts
│   │   │   │   ├── [ 568 Apr  2 18:42]  TimeAPI.d.ts.map
│   │   │   │   ├── [8.5K Apr  2 18:42]  TimeContext.d.ts
│   │   │   │   └── [ 882 Apr  2 18:42]  TimeContext.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  types
│   │   │   │   ├── [2.3K Apr  2 18:42]  Type.d.ts
│   │   │   │   ├── [ 310 Apr  2 18:42]  Type.d.ts.map
│   │   │   │   ├── [1.7K Apr  2 18:42]  TypeRegistry.d.ts
│   │   │   │   └── [ 341 Apr  2 18:42]  TypeRegistry.d.ts.map
│   │   │   ├── [4.0K Apr  2 18:41]  user
│   │   │   │   ├── [1.4K Apr  2 18:42]  constants.d.ts
│   │   │   │   ├── [ 187 Apr  2 18:42]  constants.d.ts.map
│   │   │   │   ├── [4.8K Apr  2 18:42]  StatusAPI.d.ts
│   │   │   │   ├── [ 939 Apr  2 18:42]  StatusAPI.d.ts.map
│   │   │   │   ├── [2.8K Apr  2 18:42]  StatusUserProvider.d.ts
│   │   │   │   ├── [ 910 Apr  2 18:42]  StatusUserProvider.d.ts.map
│   │   │   │   ├── [3.4K Apr  2 18:42]  UserAPI.d.ts
│   │   │   │   ├── [ 571 Apr  2 18:42]  UserAPI.d.ts.map
│   │   │   │   ├── [1.3K Apr  2 18:42]  User.d.ts
│   │   │   │   ├── [ 215 Apr  2 18:42]  User.d.ts.map
│   │   │   │   ├── [1.7K Apr  2 18:42]  UserProvider.d.ts
│   │   │   │   └── [ 269 Apr  2 18:42]  UserProvider.d.ts.map
│   │   │   ├── [  33 Apr  2 18:42]  api.d.ts
│   │   │   ├── [ 110 Apr  2 18:42]  api.d.ts.map
│   │   │   ├── [1.2K Apr  2 18:42]  Branding.d.ts
│   │   │   ├── [ 204 Apr  2 18:42]  Branding.d.ts.map
│   │   │   ├── [ 732 Apr  2 18:42]  Editor.d.ts
│   │   │   └── [ 262 Apr  2 18:42]  Editor.d.ts.map
│   │   ├── [4.0K Apr  2 18:41]  plugins
│   │   │   └── [4.0K Apr  2 18:41]  displayLayout
│   │   │       ├── [ 296 Apr  2 18:42]  CustomStringFormatter.d.ts
│   │   │       └── [ 248 Apr  2 18:42]  CustomStringFormatter.d.ts.map
│   │   ├── [4.0K Apr  2 18:41]  ui
│   │   │   └── [4.0K Apr  2 18:41]  router
│   │   │       ├── [6.7K Apr  2 18:42]  ApplicationRouter.d.ts
│   │   │       └── [1.1K Apr  2 18:42]  ApplicationRouter.d.ts.map
│   │   ├── [4.0K Apr  2 18:41]  utils
│   │   │   └── [4.0K Apr  2 18:41]  template
│   │   │       ├── [ 175 Apr  2 18:42]  templateHelpers.d.ts
│   │   │       └── [ 169 Apr  2 18:42]  templateHelpers.d.ts.map
│   │   ├── [  33 Apr  2 18:42]  MCT.d.ts
│   │   └── [ 103 Apr  2 18:42]  MCT.d.ts.map
│   ├── [1.9K Apr  2 18:42]  couchDBChangesFeed.js
│   ├── [6.7K Apr  2 18:42]  couchDBChangesFeed.js.map
│   ├── [274K Apr  2 18:42]  espressoTheme.css
│   ├── [762K Apr  2 18:42]  espressoTheme.css.map
│   ├── [ 457 Apr  2 18:42]  espressoTheme.js
│   ├── [1.4K Apr  2 18:42]  espressoTheme.js.map
│   ├── [2.2K Apr  2 18:42]  generatorWorker.js
│   ├── [ 12K Apr  2 18:42]  generatorWorker.js.map
│   ├── [8.4K Apr  2 18:42]  index.html
│   ├── [1.9K Apr  2 18:42]  inMemorySearchWorker.js
│   ├── [ 11K Apr  2 18:42]  inMemorySearchWorker.js.map
│   ├── [1.8K Apr  2 18:42]  openmct.d.ts
│   ├── [ 787 Apr  2 18:42]  openmct.d.ts.map
│   ├── [4.1M Apr  2 18:42]  openmct.js
│   ├── [2.3K Apr  2 18:42]  openmct.js.LICENSE.txt
│   ├── [ 14M Apr  2 18:42]  openmct.js.map
│   ├── [273K Apr  2 18:42]  snowTheme.css
│   ├── [761K Apr  2 18:42]  snowTheme.css.map
│   ├── [ 453 Apr  2 18:42]  snowTheme.js
│   └── [1.4K Apr  2 18:42]  snowTheme.js.map
├── [2.3K Apr  2 18:42]  build-docs.sh
├── [ 531 Apr  2 18:42]  codecov.yml
├── [8.5K Apr  2 18:42]  index.html
├── [ 126 Apr  2 18:42]  indexTest.js
├── [3.9K Apr  2 18:42]  karma.conf.js
├── [ 34K Apr  2 18:42]  license.md
├── [3.5K Apr  2 18:42]  openmct.js
├── [5.2K Apr  2 18:42]  package.json
├── [186K Apr  2 18:42]  pnpm-lock.yaml
├── [ 83K Apr  2 18:42]  Readme.md
├── [ 984 Apr  2 18:42]  tsconfig.json
└── [   0 Apr  2 18:45]  tree.txt

357 directories, 1178 files
```

# mct
MCT Dev
```bash
.
├── api
│   ├── actions
│   │   ├── ActionCollection.js
│   │   ├── ActionCollectionSpec.js
│   │   ├── ActionsAPI.js
│   │   ├── ActionsAPISpec.js
│   │   └── index.js
│   ├── annotation
│   │   ├── AnnotationAPI.js
│   │   ├── AnnotationAPISpec.js
│   │   └── index.js
│   ├── api.js
│   ├── Branding.js
│   ├── composition
│   │   ├── CompositionAPI.js
│   │   ├── CompositionAPISpec.js
│   │   ├── CompositionCollection.js
│   │   ├── CompositionProvider.js
│   │   ├── DefaultCompositionProvider.js
│   │   └── index.js
│   ├── Editor.js
│   ├── EditorSpec.js
│   ├── faultmanagement
│   │   ├── FaultManagementAPI.js
│   │   ├── FaultManagementAPISpec.js
│   │   └── index.js
│   ├── forms
│   │   ├── components
│   │   │   ├── controls
│   │   │   │   ├── AutoCompleteField.vue
│   │   │   │   ├── CheckBoxField.vue
│   │   │   │   ├── ClockDisplayFormatField.vue
│   │   │   │   ├── CompositeItem.vue
│   │   │   │   ├── Composite.vue
│   │   │   │   ├── Datetime.vue
│   │   │   │   ├── FileInput.vue
│   │   │   │   ├── index.js
│   │   │   │   ├── Locator.vue
│   │   │   │   ├── NumberField.vue
│   │   │   │   ├── SelectField.vue
│   │   │   │   ├── TextAreaField.vue
│   │   │   │   ├── TextField.vue
│   │   │   │   └── ToggleSwitchField.vue
│   │   │   ├── FormProperties.vue
│   │   │   ├── FormRow.vue
│   │   │   └── index.js
│   │   ├── FormController.js
│   │   ├── FormsAPI.js
│   │   ├── FormsAPISpec.js
│   │   ├── index.js
│   │   └── toggle-check-box-mixin.js
│   ├── index.js
│   ├── indicators
│   │   ├── index.js
│   │   ├── IndicatorAPI.js
│   │   ├── IndicatorAPISpec.js
│   │   ├── res
│   │   │   ├── index.js
│   │   │   └── indicator-template.html
│   │   └── SimpleIndicator.js
│   ├── menu
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── Menu.vue
│   │   │   └── SuperMenu.vue
│   │   ├── index.js
│   │   ├── MenuAPI.js
│   │   ├── MenuAPISpec.js
│   │   └── menu.js
│   ├── notifications
│   │   ├── index.js
│   │   ├── NotificationAPI.js
│   │   └── NotificationAPISpec.js
│   ├── objects
│   │   ├── ConflictError.js
│   │   ├── index.js
│   │   ├── InMemorySearchProvider.js
│   │   ├── InMemorySearchWorker.js
│   │   ├── InterceptorRegistry.js
│   │   ├── InterceptorRegistrySpec.js
│   │   ├── MutableDomainObject.js
│   │   ├── ObjectAPI.js
│   │   ├── ObjectAPISearchSpec.js
│   │   ├── ObjectAPISpec.js
│   │   ├── object-utils.js
│   │   ├── RootObjectProvider.js
│   │   ├── RootRegistry.js
│   │   ├── test
│   │   │   ├── index.js
│   │   │   ├── object-utilsSpec.js
│   │   │   ├── RootObjectProviderSpec.js
│   │   │   └── RootRegistrySpec.js
│   │   ├── Transaction.js
│   │   └── TransactionSpec.js
│   ├── overlays
│   │   ├── components
│   │   │   ├── dialog-component.scss
│   │   │   ├── DialogComponent.vue
│   │   │   ├── index.js
│   │   │   ├── overlay-component.scss
│   │   │   ├── OverlayComponent.vue
│   │   │   └── ProgressDialogComponent.vue
│   │   ├── Dialog.js
│   │   ├── index.js
│   │   ├── OverlayAPI.js
│   │   ├── Overlay.js
│   │   └── ProgressDialog.js
│   ├── priority
│   │   ├── index.js
│   │   └── PriorityAPI.js
│   ├── status
│   │   ├── index.js
│   │   ├── StatusAPI.js
│   │   └── StatusAPISpec.js
│   ├── telemetry
│   │   ├── constants.js
│   │   ├── DefaultMetadataProvider.js
│   │   ├── index.js
│   │   ├── TelemetryAPI.js
│   │   ├── TelemetryAPISpec.js
│   │   ├── TelemetryCollection.js
│   │   ├── TelemetryCollectionSpec.js
│   │   ├── TelemetryMetadataManager.js
│   │   ├── TelemetryRequestInterceptor.js
│   │   └── TelemetryValueFormatter.js
│   ├── time
│   │   ├── GlobalTimeContext.js
│   │   ├── independentTimeAPISpec.js
│   │   ├── IndependentTimeContext.js
│   │   ├── index.js
│   │   ├── TimeAPI.js
│   │   ├── TimeAPISpec.js
│   │   └── TimeContext.js
│   ├── types
│   │   ├── index.js
│   │   ├── Type.js
│   │   ├── TypeRegistry.js
│   │   └── TypeRegistrySpec.js
│   └── user
│       ├── constants.js
│       ├── index.js
│       ├── StatusAPI.js
│       ├── StatusUserProvider.js
│       ├── UserAPI.js
│       ├── UserAPISpec.js
│       ├── User.js
│       ├── UserProvider.js
│       └── UserStatusAPISpec.js
├── exporters
│   ├── CSVExporter.js
│   ├── ImageExporter.js
│   ├── ImageExporterSpec.js
│   ├── index.js
│   └── JSONExporter.js
├── images
│   ├── favicons
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon-96x96.png
│   │   └── index.js
│   └── index.js
├── index.js
├── MCT.js
├── MCTSpec.js
├── plugins
│   ├── autoflow
│   │   ├── AutoflowTabularConstants.js
│   │   ├── AutoflowTabularController.js
│   │   ├── autoflow-tabular.html
│   │   ├── AutoflowTabularPlugin.js
│   │   ├── AutoflowTabularPluginSpec.js
│   │   ├── AutoflowTabularRowController.js
│   │   ├── AutoflowTabularView.js
│   │   ├── dom-observer.js
│   │   ├── index.js
│   │   ├── README.md
│   │   └── VueView.js
│   ├── charts
│   │   ├── bar
│   │   │   ├── BarGraphCompositionPolicy.js
│   │   │   ├── BarGraphConstants.js
│   │   │   ├── BarGraphPlot.vue
│   │   │   ├── BarGraphViewProvider.js
│   │   │   ├── BarGraphView.vue
│   │   │   ├── index.js
│   │   │   ├── inspector
│   │   │   │   ├── BarGraphInspectorViewProvider.js
│   │   │   │   ├── BarGraphOptions.vue
│   │   │   │   ├── index.js
│   │   │   │   └── SeriesOptions.vue
│   │   │   ├── plugin.js
│   │   │   └── pluginSpec.js
│   │   ├── index.js
│   │   └── scatter
│   │       ├── index.js
│   │       ├── inspector
│   │       │   ├── index.js
│   │       │   ├── PlotOptionsBrowse.vue
│   │       │   ├── PlotOptionsEdit.vue
│   │       │   ├── PlotOptions.vue
│   │       │   └── ScatterPlotInspectorViewProvider.js
│   │       ├── plugin.js
│   │       ├── pluginSpec.js
│   │       ├── ScatterPlotCompositionPolicy.js
│   │       ├── scatterPlotConstants.js
│   │       ├── ScatterPlotForm.vue
│   │       ├── ScatterPlotViewProvider.js
│   │       ├── ScatterPlotView.vue
│   │       └── ScatterPlotWithUnderlay.vue
│   ├── clearData
│   │   ├── ClearDataAction.js
│   │   ├── components
│   │   │   ├── globalClearIndicator.vue
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── clock
│   │   ├── ClockViewProvider.js
│   │   ├── components
│   │   │   ├── ClockIndicator.vue
│   │   │   ├── Clock.vue
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── condition
│   │   ├── components
│   │   │   ├── conditionals.scss
│   │   │   ├── ConditionCollection.vue
│   │   │   ├── ConditionDescription.vue
│   │   │   ├── ConditionError.vue
│   │   │   ├── ConditionSet.vue
│   │   │   ├── Condition.vue
│   │   │   ├── Criterion.vue
│   │   │   ├── CurrentOutput.vue
│   │   │   ├── index.js
│   │   │   ├── inspector
│   │   │   │   ├── conditional-styles.scss
│   │   │   │   ├── ConditionalStylesView.vue
│   │   │   │   ├── index.js
│   │   │   │   ├── StyleEditor.vue
│   │   │   │   └── StylesView.vue
│   │   │   └── TestData.vue
│   │   ├── Condition.js
│   │   ├── ConditionManager.js
│   │   ├── ConditionManagerSpec.js
│   │   ├── ConditionSetCompositionPolicy.js
│   │   ├── ConditionSetCompositionPolicySpec.js
│   │   ├── ConditionSetMetadataProvider.js
│   │   ├── ConditionSetTelemetryProvider.js
│   │   ├── ConditionSetViewProvider.js
│   │   ├── ConditionSpec.js
│   │   ├── criterion
│   │   │   ├── AllTelemetryCriterion.js
│   │   │   ├── index.js
│   │   │   ├── TelemetryCriterion.js
│   │   │   └── TelemetryCriterionSpec.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── StyleRuleManager.js
│   │   └── utils
│   │       ├── constants.js
│   │       ├── evaluator.js
│   │       ├── evaluatorSpec.js
│   │       ├── index.js
│   │       ├── operations.js
│   │       ├── operationsSpec.js
│   │       ├── styleUtils.js
│   │       ├── time.js
│   │       └── timeSpec.js
│   ├── conditionWidget
│   │   ├── components
│   │   │   ├── condition-widget.scss
│   │   │   ├── ConditionWidget.vue
│   │   │   └── index.js
│   │   ├── ConditionWidgetViewProvider.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── CouchDBSearchFolder
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── defaultRootName
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── DeviceClassifier
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── src
│   │       ├── DeviceClassifier.js
│   │       ├── DeviceClassifierSpec.js
│   │       ├── DeviceMatchers.js
│   │       ├── DeviceMatchersSpec.js
│   │       └── index.js
│   ├── displayLayout
│   │   ├── actions
│   │   │   ├── CopyToClipboardAction.js
│   │   │   └── index.js
│   │   ├── AlphanumericFormatViewProvider.js
│   │   ├── components
│   │   │   ├── AlphanumericFormat.vue
│   │   │   ├── box-and-line-views.scss
│   │   │   ├── BoxView.vue
│   │   │   ├── DisplayLayoutGrid.vue
│   │   │   ├── display-layout.scss
│   │   │   ├── DisplayLayout.vue
│   │   │   ├── edit-marquee.scss
│   │   │   ├── EditMarquee.vue
│   │   │   ├── EllipseView.vue
│   │   │   ├── image-view.scss
│   │   │   ├── ImageView.vue
│   │   │   ├── index.js
│   │   │   ├── layout-frame.scss
│   │   │   ├── LayoutFrame.vue
│   │   │   ├── LineView.vue
│   │   │   ├── SubobjectView.vue
│   │   │   ├── telemetry-view.scss
│   │   │   ├── TelemetryView.vue
│   │   │   ├── text-view.scss
│   │   │   └── TextView.vue
│   │   ├── CustomStringFormatter.js
│   │   ├── CustomStringFormatterSpec.js
│   │   ├── DisplayLayoutToolbar.js
│   │   ├── DisplayLayoutType.js
│   │   ├── DrawingObjectTypes.js
│   │   ├── index.js
│   │   ├── LayoutDrag.js
│   │   ├── mixins
│   │   │   ├── index.js
│   │   │   └── objectStyles-mixin.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── duplicate
│   │   ├── DuplicateAction.js
│   │   ├── DuplicateTask.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── exportAsJSONAction
│   │   ├── ExportAsJSONAction.js
│   │   ├── ExportAsJSONActionSpec.js
│   │   ├── index.js
│   │   └── plugin.js
│   ├── faultManagement
│   │   ├── constants.js
│   │   ├── FaultManagementInspectorViewProvider.js
│   │   ├── FaultManagementInspector.vue
│   │   ├── FaultManagementListHeader.vue
│   │   ├── FaultManagementListItem.vue
│   │   ├── FaultManagementListView.vue
│   │   ├── FaultManagementObjectProvider.js
│   │   ├── FaultManagementPlugin.js
│   │   ├── FaultManagementSearch.vue
│   │   ├── FaultManagementToolbar.vue
│   │   ├── FaultManagementViewProvider.js
│   │   ├── FaultManagementView.vue
│   │   ├── fault-manager.scss
│   │   ├── index.js
│   │   └── pluginSpec.js
│   ├── filters
│   │   ├── components
│   │   │   ├── FilterField.vue
│   │   │   ├── FilterObject.vue
│   │   │   ├── filters-view.scss
│   │   │   ├── FiltersView.vue
│   │   │   ├── global-filters.scss
│   │   │   ├── GlobalFilters.vue
│   │   │   └── index.js
│   │   ├── FiltersInspectorViewProvider.js
│   │   ├── index.js
│   │   └── plugin.js
│   ├── flexibleLayout
│   │   ├── components
│   │   │   ├── container.vue
│   │   │   ├── dropHint.vue
│   │   │   ├── flexible-layout.scss
│   │   │   ├── flexibleLayout.vue
│   │   │   ├── frame.vue
│   │   │   ├── index.js
│   │   │   └── resizeHandle.vue
│   │   ├── flexibleLayoutViewProvider.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── toolbarProvider.js
│   │   └── utils
│   │       ├── container.js
│   │       ├── frame.js
│   │       └── index.js
│   ├── folderView
│   │   ├── components
│   │   │   ├── composition-loader.js
│   │   │   ├── GridItem.vue
│   │   │   ├── grid-view.scss
│   │   │   ├── GridView.vue
│   │   │   ├── index.js
│   │   │   ├── list-item.scss
│   │   │   ├── ListItem.vue
│   │   │   ├── ListView.vue
│   │   │   └── status-listener.js
│   │   ├── constants.js
│   │   ├── FolderGridView.js
│   │   ├── FolderListView.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── formActions
│   │   ├── CreateAction.js
│   │   ├── CreateActionSpec.js
│   │   ├── CreateWizard.js
│   │   ├── EditPropertiesAction.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── PropertiesAction.js
│   ├── gauge
│   │   ├── components
│   │   │   ├── GaugeFormController.vue
│   │   │   ├── Gauge.vue
│   │   │   └── index.js
│   │   ├── gauge-limit-util.js
│   │   ├── GaugePlugin.js
│   │   ├── GaugePluginSpec.js
│   │   ├── gauge.scss
│   │   ├── GaugeViewProvider.js
│   │   └── index.js
│   ├── goToOriginalAction
│   │   ├── goToOriginalAction.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── hyperlink
│   │   ├── HyperlinkLayout.vue
│   │   ├── HyperlinkProvider.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── imagery
│   │   ├── components
│   │   │   ├── Compass
│   │   │   │   ├── CompassHUD.vue
│   │   │   │   ├── CompassRose.vue
│   │   │   │   ├── compass.scss
│   │   │   │   ├── Compass.vue
│   │   │   │   ├── index.js
│   │   │   │   ├── pluginSpec.js
│   │   │   │   └── utils.js
│   │   │   ├── FilterSettings.vue
│   │   │   ├── ImageControls.vue
│   │   │   ├── ImageryTimeView.vue
│   │   │   ├── ImageryViewMenuSwitcher.vue
│   │   │   ├── imagery-view.scss
│   │   │   ├── ImageryView.vue
│   │   │   ├── ImageThumbnail.vue
│   │   │   ├── index.js
│   │   │   ├── LayerSettings.vue
│   │   │   ├── RelatedTelemetry
│   │   │   │   ├── index.js
│   │   │   │   └── RelatedTelemetry.js
│   │   │   └── ZoomSettings.vue
│   │   ├── ImageryTimestripViewProvider.js
│   │   ├── ImageryView.js
│   │   ├── ImageryViewProvider.js
│   │   ├── index.js
│   │   ├── layers
│   │   │   ├── example-imagery-layer-16x9.png
│   │   │   ├── example-imagery-layer-safe.png
│   │   │   ├── example-imagery-layer-scale.png
│   │   │   └── index.js
│   │   ├── lib
│   │   │   ├── eventHelpers.js
│   │   │   └── index.js
│   │   ├── mixins
│   │   │   ├── imageryData.js
│   │   │   └── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── importFromJSONAction
│   │   ├── ImportFromJSONAction.js
│   │   ├── ImportFromJSONActionSpec.js
│   │   ├── index.js
│   │   └── plugin.js
│   ├── index.js
│   ├── inspectorViews
│   │   ├── annotations
│   │   │   ├── AnnotationsInspectorView.vue
│   │   │   ├── AnnotationsViewProvider.js
│   │   │   ├── index.js
│   │   │   └── tags
│   │   │       ├── index.js
│   │   │       ├── TagEditor.vue
│   │   │       ├── TagSelection.vue
│   │   │       └── tags.scss
│   │   ├── elements
│   │   │   ├── ElementItemGroup.vue
│   │   │   ├── ElementItem.vue
│   │   │   ├── ElementsPool.vue
│   │   │   ├── elements.scss
│   │   │   ├── ElementsViewProvider.js
│   │   │   ├── index.js
│   │   │   ├── PlotElementsPool.vue
│   │   │   └── PlotElementsViewProvider.js
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── properties
│   │   │   ├── DetailText.vue
│   │   │   ├── index.js
│   │   │   ├── location.scss
│   │   │   ├── Location.vue
│   │   │   ├── PropertiesViewProvider.js
│   │   │   └── Properties.vue
│   │   └── styles
│   │       ├── constants.js
│   │       ├── FontStyleEditor.vue
│   │       ├── index.js
│   │       ├── SavedStyleSelector.vue
│   │       ├── SavedStylesInspectorView.vue
│   │       ├── SavedStylesView.vue
│   │       ├── StylesInspectorViewProvider.js
│   │       ├── StylesInspectorView.vue
│   │       └── StylesManager.js
│   ├── interceptors
│   │   ├── index.js
│   │   ├── missingObjectInterceptor.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── ISOTimeFormat
│   │   ├── index.js
│   │   ├── ISOTimeFormat.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── LADTable
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── LADRow.vue
│   │   │   ├── LADTableConfiguration.vue
│   │   │   ├── LadTableSet.vue
│   │   │   └── LADTable.vue
│   │   ├── index.js
│   │   ├── LADTableCompositionPolicy.js
│   │   ├── LADTableConfiguration.js
│   │   ├── LADTableConfigurationViewProvider.js
│   │   ├── LadTableSetView.js
│   │   ├── LADTableSetViewProvider.js
│   │   ├── LADTableView.js
│   │   ├── LADTableViewProvider.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── ViewActions.js
│   ├── latestDataClock
│   │   ├── index.js
│   │   ├── LADClock.js
│   │   └── plugin.js
│   ├── licenses
│   │   ├── index.js
│   │   ├── Licenses.vue
│   │   ├── plugin.js
│   │   └── third-party-licenses.json
│   ├── linkAction
│   │   ├── index.js
│   │   ├── LinkAction.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── localStorage
│   │   ├── index.js
│   │   ├── LocalStorageObjectProvider.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── localTimeSystem
│   │   ├── index.js
│   │   ├── LocalTimeFormat.js
│   │   ├── LocalTimeSystem.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── move
│   │   ├── index.js
│   │   ├── MoveAction.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── myItems
│   │   ├── createMyItemsIdentifier.js
│   │   ├── index.js
│   │   ├── myItemsInterceptor.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── README.md
│   ├── newFolderAction
│   │   ├── index.js
│   │   ├── newFolderAction.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── notebook
│   │   ├── actions
│   │   │   ├── CopyToNotebookAction.js
│   │   │   ├── ExportNotebookAsTextAction.js
│   │   │   └── index.js
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── MenuItems.vue
│   │   │   ├── NotebookEmbed.vue
│   │   │   ├── NotebookEntry.vue
│   │   │   ├── NotebookMenuSwitcher.vue
│   │   │   ├── NotebookSnapshotContainer.vue
│   │   │   ├── NotebookSnapshotIndicator.vue
│   │   │   ├── Notebook.vue
│   │   │   ├── PageCollection.vue
│   │   │   ├── PageComponent.vue
│   │   │   ├── PopupMenu.vue
│   │   │   ├── SearchResults.vue
│   │   │   ├── SectionCollection.vue
│   │   │   ├── SectionComponent.vue
│   │   │   ├── sidebar.scss
│   │   │   ├── Sidebar.vue
│   │   │   └── snapshot-template.html
│   │   ├── index.js
│   │   ├── monkeyPatchObjectAPIForNotebooks.js
│   │   ├── notebook-constants.js
│   │   ├── NotebookType.js
│   │   ├── NotebookViewProvider.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── snapshot-container.js
│   │   ├── snapshot.js
│   │   └── utils
│   │       ├── index.js
│   │       ├── notebook-entries.js
│   │       ├── notebook-entriesSpec.js
│   │       ├── notebook-image.js
│   │       ├── notebook-key-code.js
│   │       ├── notebook-migration.js
│   │       ├── notebook-snapshot-menu.js
│   │       ├── notebook-storage.js
│   │       ├── notebook-storageSpec.js
│   │       ├── painterroInstance.js
│   │       └── removeDialog.js
│   ├── notificationIndicator
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── NotificationIndicator.vue
│   │   │   ├── NotificationMessage.vue
│   │   │   └── NotificationsList.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── objectMigration
│   │   ├── index.js
│   │   ├── Migrations.js
│   │   └── plugin.js
│   ├── openInNewTabAction
│   │   ├── index.js
│   │   ├── openInNewTabAction.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── operatorStatus
│   │   ├── AbstractStatusIndicator.js
│   │   ├── index.js
│   │   ├── operatorStatus
│   │   │   ├── index.js
│   │   │   ├── OperatorStatusIndicator.js
│   │   │   └── OperatorStatus.vue
│   │   ├── operator-status.scss
│   │   ├── plugin.js
│   │   └── pollQuestion
│   │       ├── index.js
│   │       ├── PollQuestionIndicator.js
│   │       └── PollQuestion.vue
│   ├── performanceIndicator
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── README.md
│   ├── persistence
│   │   ├── couch
│   │   │   ├── CouchChangesFeed.js
│   │   │   ├── couchdb-compose.yaml
│   │   │   ├── CouchDocument.js
│   │   │   ├── CouchObjectProvider.js
│   │   │   ├── CouchObjectQueue.js
│   │   │   ├── CouchSearchProvider.js
│   │   │   ├── CouchStatusIndicator.js
│   │   │   ├── index.js
│   │   │   ├── plugin.js
│   │   │   ├── pluginSpec.js
│   │   │   ├── README.md
│   │   │   ├── replace-localstorage-with-couchdb-indexhtml.sh
│   │   │   └── setup-couchdb.sh
│   │   └── index.js
│   ├── plan
│   │   ├── components
│   │   │   ├── ActivityTimeline.vue
│   │   │   ├── index.js
│   │   │   └── Plan.vue
│   │   ├── GanttChartCompositionPolicy.js
│   │   ├── index.js
│   │   ├── inspector
│   │   │   ├── ActivityInspectorViewProvider.js
│   │   │   ├── components
│   │   │   │   ├── ActivityProperty.vue
│   │   │   │   ├── index.js
│   │   │   │   ├── PlanActivitiesView.vue
│   │   │   │   ├── PlanActivityView.vue
│   │   │   │   └── PlanViewConfiguration.vue
│   │   │   ├── GanttChartInspectorViewProvider.js
│   │   │   └── index.js
│   │   ├── plan.scss
│   │   ├── PlanViewConfiguration.js
│   │   ├── PlanViewProvider.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── README.md
│   │   └── util.js
│   ├── plot
│   │   ├── actions
│   │   │   ├── index.js
│   │   │   ├── utils.js
│   │   │   └── ViewActions.js
│   │   ├── axis
│   │   │   ├── index.js
│   │   │   ├── XAxis.vue
│   │   │   └── YAxis.vue
│   │   ├── chart
│   │   │   ├── index.js
│   │   │   ├── LimitLabel.vue
│   │   │   ├── LimitLine.vue
│   │   │   ├── limitUtil.js
│   │   │   ├── MCTChartAlarmLineSet.js
│   │   │   ├── MCTChartAlarmPointSet.js
│   │   │   ├── MCTChartLineLinear.js
│   │   │   ├── MCTChartLineStepAfter.js
│   │   │   ├── MCTChartPointSet.js
│   │   │   ├── MCTChartSeriesElement.js
│   │   │   └── MctChart.vue
│   │   ├── configuration
│   │   │   ├── Collection.js
│   │   │   ├── ConfigStore.js
│   │   │   ├── index.js
│   │   │   ├── LegendModel.js
│   │   │   ├── Model.js
│   │   │   ├── PlotConfigurationModel.js
│   │   │   ├── PlotSeries.js
│   │   │   ├── SeriesCollection.js
│   │   │   ├── XAxisModel.js
│   │   │   └── YAxisModel.js
│   │   ├── draw
│   │   │   ├── Draw2D.js
│   │   │   ├── DrawLoader.js
│   │   │   ├── DrawWebGL.js
│   │   │   ├── index.js
│   │   │   └── MarkerShapes.js
│   │   ├── index.js
│   │   ├── inspector
│   │   │   ├── forms
│   │   │   │   ├── formUtil.js
│   │   │   │   ├── index.js
│   │   │   │   ├── LegendForm.vue
│   │   │   │   ├── SeriesForm.vue
│   │   │   │   └── YAxisForm.vue
│   │   │   ├── index.js
│   │   │   ├── PlotOptionsBrowse.vue
│   │   │   ├── PlotOptionsEdit.vue
│   │   │   ├── PlotOptionsItem.vue
│   │   │   ├── PlotOptions.vue
│   │   │   ├── PlotsInspectorViewProvider.js
│   │   │   └── StackedPlotsInspectorViewProvider.js
│   │   ├── legend
│   │   │   ├── index.js
│   │   │   ├── PlotLegendItemCollapsed.vue
│   │   │   ├── PlotLegendItemExpanded.vue
│   │   │   └── PlotLegend.vue
│   │   ├── lib
│   │   │   ├── eventHelpers.js
│   │   │   └── index.js
│   │   ├── LinearScale.js
│   │   ├── mathUtils.js
│   │   ├── MctPlot.vue
│   │   ├── MctTicks.vue
│   │   ├── overlayPlot
│   │   │   ├── index.js
│   │   │   ├── OverlayPlotCompositionPolicy.js
│   │   │   ├── OverlayPlotViewProvider.js
│   │   │   └── pluginSpec.js
│   │   ├── PlotViewProvider.js
│   │   ├── Plot.vue
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── README.md
│   │   ├── stackedPlot
│   │   │   ├── index.js
│   │   │   ├── mixins
│   │   │   │   ├── index.js
│   │   │   │   └── objectStyles-mixin.js
│   │   │   ├── pluginSpec.js
│   │   │   ├── StackedPlotCompositionPolicy.js
│   │   │   ├── stackedPlotConfigurationInterceptor.js
│   │   │   ├── StackedPlotItem.vue
│   │   │   ├── StackedPlotViewProvider.js
│   │   │   └── StackedPlot.vue
│   │   └── tickUtils.js
│   ├── plugins.js
│   ├── remoteClock
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── RemoteClock.js
│   │   ├── RemoteClockSpec.js
│   │   └── requestInterceptor.js
│   ├── remove
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── RemoveAction.js
│   ├── staticRootPlugin
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── README.md
│   │   ├── StaticModelProvider.js
│   │   ├── StaticModelProviderSpec.js
│   │   └── static-provider-test.json
│   ├── summaryWidget
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── README.md
│   │   ├── res
│   │   │   ├── conditionTemplate.html
│   │   │   ├── index.js
│   │   │   ├── input
│   │   │   │   ├── index.js
│   │   │   │   ├── paletteTemplate.html
│   │   │   │   └── selectTemplate.html
│   │   │   ├── ruleImageTemplate.html
│   │   │   ├── ruleTemplate.html
│   │   │   ├── testDataItemTemplate.html
│   │   │   ├── testDataTemplate.html
│   │   │   └── widgetTemplate.html
│   │   ├── src
│   │   │   ├── ConditionEvaluator.js
│   │   │   ├── Condition.js
│   │   │   ├── ConditionManager.js
│   │   │   ├── eventHelpers.js
│   │   │   ├── index.js
│   │   │   ├── input
│   │   │   │   ├── ColorPalette.js
│   │   │   │   ├── IconPalette.js
│   │   │   │   ├── index.js
│   │   │   │   ├── KeySelect.js
│   │   │   │   ├── ObjectSelect.js
│   │   │   │   ├── OperationSelect.js
│   │   │   │   ├── Palette.js
│   │   │   │   └── Select.js
│   │   │   ├── Rule.js
│   │   │   ├── SummaryWidget.js
│   │   │   ├── telemetry
│   │   │   │   ├── EvaluatorPool.js
│   │   │   │   ├── EvaluatorPoolSpec.js
│   │   │   │   ├── index.js
│   │   │   │   ├── operations.js
│   │   │   │   ├── SummaryWidgetCondition.js
│   │   │   │   ├── SummaryWidgetConditionSpec.js
│   │   │   │   ├── SummaryWidgetEvaluator.js
│   │   │   │   ├── SummaryWidgetMetadataProvider.js
│   │   │   │   ├── SummaryWidgetRule.js
│   │   │   │   ├── SummaryWidgetRuleSpec.js
│   │   │   │   ├── SummaryWidgetTelemetryProvider.js
│   │   │   │   └── SummaryWidgetTelemetryProviderSpec.js
│   │   │   ├── TestDataItem.js
│   │   │   ├── TestDataManager.js
│   │   │   ├── views
│   │   │   │   ├── index.js
│   │   │   │   ├── summary-widget.html
│   │   │   │   ├── SummaryWidgetView.js
│   │   │   │   └── SummaryWidgetViewProvider.js
│   │   │   └── WidgetDnD.js
│   │   ├── SummaryWidgetsCompositionPolicy.js
│   │   ├── SummaryWidgetViewPolicy.js
│   │   └── test
│   │       ├── ConditionEvaluatorSpec.js
│   │       ├── ConditionManagerSpec.js
│   │       ├── ConditionSpec.js
│   │       ├── index.js
│   │       ├── input
│   │       │   ├── ColorPaletteSpec.js
│   │       │   ├── IconPaletteSpec.js
│   │       │   ├── index.js
│   │       │   ├── KeySelectSpec.js
│   │       │   ├── ObjectSelectSpec.js
│   │       │   ├── OperationSelectSpec.js
│   │       │   ├── PaletteSpec.js
│   │       │   └── SelectSpec.js
│   │       ├── RuleSpec.js
│   │       ├── SummaryWidgetSpec.js
│   │       ├── SummaryWidgetViewPolicySpec.js
│   │       ├── TestDataItemSpec.js
│   │       ├── TestDataManagerSpec.js
│   │       └── WidgetDnDSpec.js
│   ├── tabs
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── tabs.scss
│   │   │   └── tabs.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── tabs.js
│   ├── telemetryMean
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── src
│   │       ├── index.js
│   │       ├── MeanTelemetryProvider.js
│   │       ├── MeanTelemetryProviderSpec.js
│   │       ├── MockTelemetryApi.js
│   │       └── TelemetryAverager.js
│   ├── telemetryTable
│   │   ├── collections
│   │   │   ├── index.js
│   │   │   └── TableRowCollection.js
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── sizing-row.vue
│   │   │   ├── table-cell.vue
│   │   │   ├── table-column-header.vue
│   │   │   ├── table-configuration.vue
│   │   │   ├── table-footer-indicator.scss
│   │   │   ├── table-footer-indicator.vue
│   │   │   ├── table-row.scss
│   │   │   ├── table-row.vue
│   │   │   ├── table.scss
│   │   │   └── table.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── TableConfigurationViewProvider.js
│   │   ├── TelemetryTableColumn.js
│   │   ├── TelemetryTableConfiguration.js
│   │   ├── TelemetryTable.js
│   │   ├── TelemetryTableNameColumn.js
│   │   ├── TelemetryTableRow.js
│   │   ├── TelemetryTableType.js
│   │   ├── TelemetryTableUnitColumn.js
│   │   ├── TelemetryTableView.js
│   │   ├── TelemetryTableViewProvider.js
│   │   └── ViewActions.js
│   ├── themes
│   │   ├── espresso.js
│   │   ├── espresso-theme.scss
│   │   ├── index.js
│   │   ├── installTheme.js
│   │   ├── snow.js
│   │   └── snow-theme.scss
│   ├── timeConductor
│   │   ├── conductor-axis.scss
│   │   ├── ConductorAxis.vue
│   │   ├── ConductorHistory.vue
│   │   ├── ConductorInputsFixed.vue
│   │   ├── ConductorInputsRealtime.vue
│   │   ├── conductor-mode-icon.scss
│   │   ├── ConductorModeIcon.vue
│   │   ├── conductor-mode.scss
│   │   ├── ConductorMode.vue
│   │   ├── conductor.scss
│   │   ├── ConductorTimeSystem.vue
│   │   ├── Conductor.vue
│   │   ├── date-picker.scss
│   │   ├── DatePicker.vue
│   │   ├── independent
│   │   │   ├── IndependentTimeConductor.vue
│   │   │   ├── index.js
│   │   │   └── Mode.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── timePopup.vue
│   │   └── utcMultiTimeFormat.js
│   ├── timeline
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── TimelineCompositionPolicy.js
│   │   ├── timelineInterceptor.js
│   │   ├── TimelineObjectView.vue
│   │   ├── timeline.scss
│   │   ├── TimelineViewLayout.vue
│   │   └── TimelineViewProvider.js
│   ├── timelist
│   │   ├── constants.js
│   │   ├── index.js
│   │   ├── inspector
│   │   │   ├── EventProperties.vue
│   │   │   ├── Filtering.vue
│   │   │   ├── index.js
│   │   │   ├── TimeListInspectorViewProvider.js
│   │   │   └── TimelistPropertiesView.vue
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── TimelistCompositionPolicy.js
│   │   ├── timelist.scss
│   │   ├── TimelistViewProvider.js
│   │   └── Timelist.vue
│   ├── timer
│   │   ├── actions
│   │   │   ├── index.js
│   │   │   ├── PauseTimerAction.js
│   │   │   ├── RestartTimerAction.js
│   │   │   ├── StartTimerAction.js
│   │   │   └── StopTimerAction.js
│   │   ├── components
│   │   │   ├── index.js
│   │   │   └── Timer.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── TimerViewProvider.js
│   ├── URLIndicatorPlugin
│   │   ├── index.js
│   │   ├── README.md
│   │   ├── URLIndicator.js
│   │   ├── URLIndicatorPlugin.js
│   │   └── URLIndicatorSpec.js
│   ├── URLTimeSettingsSynchronizer
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── URLTimeSettingsSynchronizer.js
│   ├── userIndicator
│   │   ├── components
│   │   │   ├── index.js
│   │   │   └── UserIndicator.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── pluginSpec.js
│   ├── utcTimeSystem
│   │   ├── DurationFormat.js
│   │   ├── index.js
│   │   ├── LocalClock.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   ├── UTCTimeFormat.js
│   │   └── UTCTimeSystem.js
│   ├── viewDatumAction
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── metadata-list.scss
│   │   │   └── MetadataList.vue
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── pluginSpec.js
│   │   └── ViewDatumAction.js
│   ├── viewLargeAction
│   │   ├── index.js
│   │   ├── plugin.js
│   │   └── viewLargeAction.js
│   └── webPage
│       ├── components
│       │   ├── index.js
│       │   └── WebPage.vue
│       ├── index.js
│       ├── plugin.js
│       ├── pluginSpec.js
│       └── WebPageViewProvider.js
├── scrtree.txt
├── selection
│   ├── index.js
│   └── Selection.js
├── styles
│   ├── _about.scss
│   ├── _animations.scss
│   ├── _constants-espresso.scss
│   ├── _constants-maelstrom.scss
│   ├── _constants-mobile.scss
│   ├── _constants.scss
│   ├── _constants-snow.scss
│   ├── _controls.scss
│   ├── fonts
│   │   ├── index.js
│   │   ├── Open MCT Symbols 12px.json
│   │   ├── Open-MCT-Symbols-12px.ttf
│   │   ├── Open-MCT-Symbols-12px.woff
│   │   ├── Open MCT Symbols 16px.json
│   │   ├── Open-MCT-Symbols-16px.svg
│   │   ├── Open-MCT-Symbols-16px.ttf
│   │   └── Open-MCT-Symbols-16px.woff
│   ├── _forms.scss
│   ├── _global.scss
│   ├── _glyphs.scss
│   ├── index.js
│   ├── _legacy-messages.scss
│   ├── _legacy-plots.scss
│   ├── _legacy.scss
│   ├── _limits.scss
│   ├── _mixins.scss
│   ├── notebook.scss
│   ├── plotly.scss
│   ├── _status.scss
│   ├── _table.scss
│   ├── vendor
│   │   ├── index.js
│   │   └── normalize-min.scss
│   └── vue-styles.scss
├── tools
│   ├── index.js
│   ├── url.js
│   └── urlSpec.js
├── ui
│   ├── color
│   │   ├── ColorHelper.js
│   │   ├── Color.js
│   │   ├── ColorPalette.js
│   │   ├── ColorSwatch.vue
│   │   └── index.js
│   ├── components
│   │   ├── components.js
│   │   ├── COMPONENTS.md
│   │   ├── componentsSpec.js
│   │   ├── contextMenuDropDown.vue
│   │   ├── index.js
│   │   ├── List
│   │   │   ├── index.js
│   │   │   ├── ListHeader.vue
│   │   │   ├── ListItem.vue
│   │   │   ├── list-view.scss
│   │   │   └── ListView.vue
│   │   ├── object-frame.scss
│   │   ├── ObjectFrame.vue
│   │   ├── object-label.scss
│   │   ├── ObjectLabel.vue
│   │   ├── ObjectPath.vue
│   │   ├── ObjectView.vue
│   │   ├── progress-bar.scss
│   │   ├── ProgressBar.vue
│   │   ├── search.scss
│   │   ├── search.vue
│   │   ├── swim-lane
│   │   │   ├── index.js
│   │   │   ├── swimlane.scss
│   │   │   └── SwimLane.vue
│   │   ├── timesystem-axis.scss
│   │   ├── TimeSystemAxis.vue
│   │   ├── toggle-switch.scss
│   │   ├── ToggleSwitch.vue
│   │   └── viewControl.vue
│   ├── index.js
│   ├── inspector
│   │   ├── index.js
│   │   ├── InspectorDetailsSpec.js
│   │   ├── inspector.scss
│   │   ├── InspectorStylesSpec.js
│   │   ├── InspectorStylesSpecMocks.js
│   │   ├── InspectorTabs.vue
│   │   ├── InspectorViews.vue
│   │   ├── Inspector.vue
│   │   └── ObjectName.vue
│   ├── layout
│   │   ├── AboutDialog.vue
│   │   ├── app-logo.scss
│   │   ├── AppLogo.vue
│   │   ├── assets
│   │   │   ├── images
│   │   │   │   ├── bg-splash.jpg
│   │   │   │   ├── index.js
│   │   │   │   ├── logo-nasa.svg
│   │   │   │   ├── logo-openmct-shdw.svg
│   │   │   │   └── logo-openmct.svg
│   │   │   └── index.js
│   │   ├── BrowseBar.vue
│   │   ├── create-button.scss
│   │   ├── CreateButton.vue
│   │   ├── index.js
│   │   ├── layout.scss
│   │   ├── LayoutSpec.js
│   │   ├── Layout.vue
│   │   ├── mct-tree.scss
│   │   ├── mct-tree.vue
│   │   ├── multipane.vue
│   │   ├── pane.scss
│   │   ├── pane.vue
│   │   ├── RecentObjectsListItem.vue
│   │   ├── RecentObjectsList.vue
│   │   ├── recent-objects.scss
│   │   ├── search
│   │   │   ├── AnnotationSearchResult.vue
│   │   │   ├── GrandSearchSpec.js
│   │   │   ├── GrandSearch.vue
│   │   │   ├── index.js
│   │   │   ├── ObjectSearchResult.vue
│   │   │   ├── SearchResultsDropDown.vue
│   │   │   └── search.scss
│   │   ├── status-bar
│   │   │   ├── index.js
│   │   │   ├── indicators.scss
│   │   │   ├── Indicators.vue
│   │   │   ├── notification-banner.scss
│   │   │   └── NotificationBanner.vue
│   │   ├── tree-item.vue
│   │   └── ViewSwitcher.vue
│   ├── mixins
│   │   ├── context-menu-gesture.js
│   │   ├── index.js
│   │   ├── object-link.js
│   │   ├── staleness-mixin.js
│   │   └── toggle-mixin.js
│   ├── preview
│   │   ├── index.js
│   │   ├── plugin.js
│   │   ├── PreviewAction.js
│   │   ├── preview-header.vue
│   │   ├── preview.scss
│   │   ├── Preview.vue
│   │   └── ViewHistoricalDataAction.js
│   ├── registries
│   │   ├── index.js
│   │   ├── InspectorViewRegistry.js
│   │   ├── ToolbarRegistry.js
│   │   └── ViewRegistry.js
│   ├── router
│   │   ├── ApplicationRouter.js
│   │   ├── ApplicationRouterSpec.js
│   │   ├── Browse.js
│   │   └── index.js
│   └── toolbar
│       ├── components
│       │   ├── index.js
│       │   ├── toolbar-button.vue
│       │   ├── toolbar-checkbox.scss
│       │   ├── toolbar-checkbox.vue
│       │   ├── toolbar-color-picker.vue
│       │   ├── toolbar-input.vue
│       │   ├── toolbar-menu.vue
│       │   ├── toolbar-select-menu.vue
│       │   ├── toolbar-separator.vue
│       │   └── toolbar-toggle-button.vue
│       ├── index.js
│       └── Toolbar.vue
└── utils
    ├── agent
    │   ├── Agent.js
    │   ├── AgentSpec.js
    │   └── index.js
    ├── clipboard.js
    ├── clock
    │   ├── DefaultClock.js
    │   ├── index.js
    │   └── Ticker.js
    ├── duration.js
    ├── index.js
    ├── raf.js
    ├── rafSpec.js
    ├── staleness.js
    ├── template
    │   ├── index.js
    │   ├── templateHelpers.js
    │   └── templateHelpersSpec.js
    ├── testing
    │   ├── index.js
    │   └── mockLocalStorage.js
    ├── testing.js
    └── textHighlight
        ├── index.js
        └── TextHighlight.vue

191 directories, 1071 files
```

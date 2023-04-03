/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([
    './actions/ActionsAPI',
    './composition/CompositionAPI',
    './Editor',
    './faultmanagement/FaultManagementAPI',
    './forms/FormsAPI',
    './indicators/IndicatorAPI',
    './menu/MenuAPI',
    './notifications/NotificationAPI',
    './objects/ObjectAPI',
    './priority/PriorityAPI',
    './status/StatusAPI',
    './telemetry/TelemetryAPI',
    './time/TimeAPI',
    './types/TypeRegistry',
    './user/UserAPI',
    './annotation/AnnotationAPI'
],

function (
    ActionsAPI,
    CompositionAPI,
    EditorAPI,
    FaultManagementAPI,
    FormsAPI,
    IndicatorAPI,
    MenuAPI,
    NotificationAPI,
    ObjectAPI,
    PriorityAPI,
    StatusAPI,
    TelemetryAPI,
    TimeAPI,
    TypeRegistry,
    UserAPI,
    AnnotationAPI
) {
    return {
        ActionsAPI: ActionsAPI.default,
        CompositionAPI: CompositionAPI,
        EditorAPI: EditorAPI,
        FaultManagementAPI: FaultManagementAPI,
        FormsAPI: FormsAPI,
        IndicatorAPI: IndicatorAPI.default,
        MenuAPI: MenuAPI.default,
        NotificationAPI: NotificationAPI.default,
        ObjectAPI: ObjectAPI,
        PriorityAPI: PriorityAPI.default,
        StatusAPI: StatusAPI.default,
        TelemetryAPI: TelemetryAPI,
        TimeAPI: TimeAPI.default,
        TypeRegistry: TypeRegistry.default,
        UserAPI: UserAPI.default,
        AnnotationAPI: AnnotationAPI.default
    };
});

/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


function ToolbarProvider(openmct) {

    return {
        name: "Flexible Layout Toolbar",
        key: "flex-layout",
        description: "A toolbar for objects inside a Flexible Layout.",
        forSelection: function (selection) {
            let context = selection[0][0].context;

            return (context && context.type
                && (context.type === 'flexible-layout' || context.type === 'container' || context.type === 'frame'));
        },
        toolbar: function (selection) {
            let selectionPath = selection[0];
            let primary = selectionPath[0];
            let secondary = selectionPath[1];
            let tertiary = selectionPath[2];
            let deleteFrame;
            let toggleContainer;
            let deleteContainer;
            let addContainer;
            let toggleFrame;

            toggleContainer = {
                control: 'toggle-button',
                key: 'toggle-layout',
                domainObject: primary.context.item,
                property: 'configuration.rowsLayout',
                options: [
                    {
                        value: true,
                        icon: 'icon-columns',
                        title: 'Columns layout'
                    },
                    {
                        value: false,
                        icon: 'icon-rows',
                        title: 'Rows layout'
                    }
                ]
            };

            function getSeparator() {
                return {
                    control: "separator"
                };
            }

            if (primary.context.type === 'frame') {
                if (secondary.context.item.locked) {
                    return [];
                }

                let frameId = primary.context.frameId;
                let layoutObject = tertiary.context.item;
                let containers = layoutObject
                    .configuration
                    .containers;
                let container = containers
                    .filter(c => c.frames.some(f => f.id === frameId))[0];
                let containerIndex = containers.indexOf(container);
                let frame = container && container
                    .frames
                    .filter((f => f.id === frameId))[0];
                let frameIndex = container && container.frames.indexOf(frame);

                deleteFrame = {
                    control: "button",
                    domainObject: primary.context.item,
                    method: function () {
                        let deleteFrameAction = tertiary.context.deleteFrame;

                        let prompt = openmct.overlays.dialog({
                            iconClass: 'alert',
                            message: `This action will remove this frame from this Flexible Layout. Do you want to continue?`,
                            buttons: [
                                {
                                    label: 'OK',
                                    emphasis: 'true',
                                    callback: function () {
                                        deleteFrameAction(primary.context.frameId);
                                        prompt.dismiss();
                                    }
                                },
                                {
                                    label: 'Cancel',
                                    callback: function () {
                                        prompt.dismiss();
                                    }
                                }
                            ]
                        });
                    },
                    key: "remove",
                    icon: "icon-trash",
                    title: "Remove Frame"
                };
                toggleFrame = {
                    control: "toggle-button",
                    domainObject: secondary.context.item,
                    property: `configuration.containers[${containerIndex}].frames[${frameIndex}].noFrame`,
                    options: [
                        {
                            value: false,
                            icon: 'icon-frame-hide',
                            title: "Frame hidden"
                        },
                        {
                            value: true,
                            icon: 'icon-frame-show',
                            title: "Frame visible"
                        }
                    ]
                };
                addContainer = {
                    control: "button",
                    domainObject: tertiary.context.item,
                    method: tertiary.context.addContainer,
                    key: "add",
                    icon: "icon-plus-in-rect",
                    title: 'Add Container'
                };

                toggleContainer.domainObject = secondary.context.item;

            } else if (primary.context.type === 'container') {
                if (primary.context.item.locked) {
                    return [];
                }

                deleteContainer = {
                    control: "button",
                    domainObject: primary.context.item,
                    method: function () {
                        let removeContainer = secondary.context.deleteContainer;
                        let containerId = primary.context.containerId;

                        let prompt = openmct.overlays.dialog({
                            iconClass: 'alert',
                            message: 'This action will permanently delete this container from this Flexible Layout. Do you want to continue?',
                            buttons: [
                                {
                                    label: 'OK',
                                    emphasis: 'true',
                                    callback: function () {
                                        removeContainer(containerId);
                                        prompt.dismiss();
                                    }
                                },
                                {
                                    label: 'Cancel',
                                    callback: function () {
                                        prompt.dismiss();
                                    }
                                }
                            ]
                        });
                    },
                    key: "remove",
                    icon: "icon-trash",
                    title: "Remove Container"
                };

                addContainer = {
                    control: "button",
                    domainObject: secondary.context.item,
                    method: secondary.context.addContainer,
                    key: "add",
                    icon: "icon-plus-in-rect",
                    title: 'Add Container'
                };

            } else if (primary.context.type === 'flexible-layout') {
                if (primary.context.item.locked) {
                    return [];
                }

                addContainer = {
                    control: "button",
                    domainObject: primary.context.item,
                    method: primary.context.addContainer,
                    key: "add",
                    icon: "icon-plus-in-rect",
                    title: 'Add Container'
                };

            }

            let toolbar = [
                toggleContainer,
                addContainer,
                toggleFrame ? getSeparator() : undefined,
                toggleFrame,
                deleteFrame || deleteContainer ? getSeparator() : undefined,
                deleteFrame,
                deleteContainer
            ];

            return toolbar.filter(button => button !== undefined);
        }
    };
}

export default ToolbarProvider;

/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

<template>
<!-- eslint-disable-next-line vue/no-v-html -->
<span v-html="highlightedText"></span>

</template>

<script>

export default {
    props: {
        text: {
            type: String,
            required: true
        },
        highlight: {
            type: String,
            default() {
                return '';
            }
        },
        highlightClass: {
            type: String,
            default() {
                return 'highlight';
            }
        }
    },
    computed: {
        highlightedText() {
            const highlight = this.highlight;

            const normalCharsRegex = /^[^A-Za-z0-9]+$/g;

            const newHighLight = normalCharsRegex.test(highlight)
                ? `\\${highlight}`
                : highlight;

            const highlightRegex = new RegExp(`(?<!<[^>]*)(${newHighLight})`, 'gi');

            const replacement = `<span class="${this.highlightClass}">${highlight}</span>`;

            return this.text.replace(highlightRegex, replacement);
        }
    }
};
</script>

/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import MCTChartSeriesElement from './MCTChartSeriesElement';

export default class MCTChartLineStepAfter extends MCTChartSeriesElement {
    removePoint(index) {
        if (index > 0 && index / 2 < this.count) {
            this.buffer[index + 1] = this.buffer[index - 1];
        }
    }

    vertexCountForPointAtIndex(index) {
        if (index === 0 && this.count === 0) {
            return 2;
        }

        return 4;
    }

    startIndexForPointAtIndex(index) {
        if (index === 0) {
            return 0;
        }

        return 2 + ((index - 1) * 4);
    }

    addPoint(point, start) {
        if (start === 0 && this.count === 0) {
            // First point is easy.
            this.buffer[start] = point.x;
            this.buffer[start + 1] = point.y; // one point
        } else if (start === 0 && this.count > 0) {
            // Unshifting requires adding an extra point.
            this.buffer[start] = point.x;
            this.buffer[start + 1] = point.y;
            this.buffer[start + 2] = this.buffer[start + 4];
            this.buffer[start + 3] = point.y;
        } else {
            // Appending anywhere in line, insert standard two points.
            this.buffer[start] = point.x;
            this.buffer[start + 1] = this.buffer[start - 1];
            this.buffer[start + 2] = point.x;
            this.buffer[start + 3] = point.y;

            if (start < this.count * 2) {
                // Insert into the middle, need to update the following
                // point.
                this.buffer[start + 5] = point.y;
            }
        }
    }
}


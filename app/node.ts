export class Node {
    id: string;
    name: string;
    children: Array<Node>;
    nodeId: number;
    hasChildren: boolean;
    isExpanded: boolean;
    clickAble: boolean;
    path: Array<string> = Array<string>();

    concatNoDuplicate(names: Array<string>) {
        names.forEach(
            item => {
                if (this.path.indexOf(item) == -1) {
                    this.path.push(item);
                }
            }
        );
    }
    pushNoDuplicate(name: string) {
        let match = false;
        for (let item of this.path) {
            if (item == name) {
                match = true;
            }
        }
        if (match == false) {
            this.path.push(name);
        }
    }

    pushNoDuplicate_map(map: Map<string, string>) {
        let iterator = map.keys();
        let match = false;
        for (let item of this.path1) {
            if (iterator.next().value == item.keys().next().value) {
                match = true;
            }
        }
        if (match == false) {
            this.path1.push(map);
        }
    }
    concatNoDuplicate_map(maps: Array<Map<string, string>>) {
        maps.forEach(
            data => {
                let match = false;
                this.path1.forEach(
                    item => {
                        if(data.keys().next().value == item.keys().next().value){
                            match = true ;
                        }
                    }
                );
                if(match){
                    this.path1.push(data);
                }
            }
        );
    }

    path1: Array<Map<string, string>> = Array<Map<string, string>>();
}

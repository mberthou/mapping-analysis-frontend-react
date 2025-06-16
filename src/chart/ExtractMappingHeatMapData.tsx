type HeatmapData = { x: number; y: number; value: number | null }[];

export const ExtractAllHeatmapData = ( mappingData, selectedSites:Array<string>, selectedSubsites:Array<string>, selectedParameters:Array<string>) => {
    let dataPerParameter = {};

    if(!mappingData || !Object.keys(mappingData).includes("Content"))
    {
        return []
    }

    const nCol : number = mappingData["Content"]["NOSitesX"];
    const nRow : number = mappingData["Content"]["NOSitesY"];
    const x0 : number = mappingData["Content"]["SiteX0"];
    const y0 : number= mappingData["Content"]["SiteY0"];
    const sites = mappingData["Content"]["sites"];
    
    for(const parameter of selectedParameters)
    {
        dataPerParameter[parameter] = [];
        for (let y = 0; y < nRow; y++) {
        for (let x = 0; x < nCol; x++) {
            const site = sites[y][x];
            if(!selectedSites.includes(site["name"]))
            {
                continue;
            }

            let values = new Array<Number>();
            for(const subsite of site["subsites"])
            {
                if(!selectedSubsites.includes(subsite["name"]) || 
                    !Object.keys(subsite).includes(parameter))
                {
                    continue;
                }

                values.push(subsite[parameter]);
            }

            const compute_average = array => array.reduce((a, b) => a + b) / array.length;
            const average = values.length ? compute_average(values) : null;
            if(average != null)
            {
                dataPerParameter[parameter].push({
                        x: x + x0,
                        y: y + y0,
                        value: average,
                    });
            }
        }
        }
    }

    return dataPerParameter;
}
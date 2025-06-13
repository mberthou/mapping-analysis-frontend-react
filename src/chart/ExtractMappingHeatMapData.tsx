type HeatmapData = { x: string; y: string; value: number }[];

export const ExtractHeatmapData = ( mappingData, siteName, subsiteName, parameter) => {
    let data: HeatmapData = [];

    if(!mappingData || !Object.keys(mappingData).includes("Content"))
    {
        return []
    }

    const nCol = mappingData["Content"]["NOSitesX"];
    const nRow = mappingData["Content"]["NOSitesY"];
    const x0 = mappingData["Content"]["SiteX0"];
    const y0 = mappingData["Content"]["SiteY0"];
    const sites = mappingData["Content"]["sites"];
    
    for (let y = 0; y < nRow; y++) {
      for (let x = 0; x < nCol; x++) {
        const site = sites[x][y];
        if(site["name"] != siteName)
        {
            continue;
        }

        for(const subsite of site["subsites"])
        {
            if(subsite["name"] != subsiteName || 
                !Object.keys(subsite).includes(parameter))
            {
                continue;
            }

            data.push({
                x: x + x0,
                y: y + y0,
                value: subsite[parameter],
            });
        }
      }
    }

    return data;
}
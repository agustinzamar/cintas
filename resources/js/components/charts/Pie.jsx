import { ResponsivePie } from '@nivo/pie';

export const MyResponsivePie = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 16, right: 16, bottom: 72, left: 16 }}
    sortByValue={true}
    innerRadius={0.5}
    activeInnerRadiusOffset={4}
    activeOuterRadiusOffset={4}
    borderColor="#000000"
    enableArcLinkLabels={false}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsDiagonalLength={15}
    arcLinkLabelsStraightLength={21}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 2]],
    }}
    defs={[]}
    fill={[]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 40,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

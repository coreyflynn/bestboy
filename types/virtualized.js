// @flow
declare type Dimensions = {
  height: number,
  width: number,
};

declare type OverscanIndicesGetterFn = ({
  direction: 'horizontal' | 'vertical',
  cellCount: number,
  scrollDirection: 1 | -1,
  overscanCellsCount: number,
  startIndex: number,
  stopIndex: number,
}) => { overscanStartIndex: number, overscanStopIndex: number };

declare type IndexRange = {
  startIndex: number,
  stopIndex: number,
}

declare type SectionRange = {
  rowStartIndex: number,
  rowStopIndex: number,
  columnStartIndex: number,
  columnStopIndex: number,
}

declare type CellRendererFn = {
  columnIndex: number,
  isScrolling: boolean,
  isVisible: boolean,
  key: string,
  parent: React$Element<*>,
  rowIndex: number,
  style: { [key: string]: string },
};

declare type ArrowStepperProps = {
  scrollToRow: number,
  scrollToColumn: number,
  onSectionRendered(section: SectionRange): any,
}

declare type ScrollRange = {
  scrollToRow: number,
  scrollToColumn: number,
}

declare type Index = { index: number };

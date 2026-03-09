export class FindAssetsByAssetGroupQuery {
  constructor(
    public readonly userId: string,
    public readonly assetgroupId: string,
    public readonly searchKeyword?: string
  ) {}
}

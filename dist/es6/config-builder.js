/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [];

  useAll() : ConfigBuilder {
    return this.useClickCounter();
  }

  useClickCounter(): ConfigBuilder {
    this.globalResources.push('./tree-view/tree-view');
    this.globalResources.push('./tree-view/tree-node-template');
    return this;
  }
}

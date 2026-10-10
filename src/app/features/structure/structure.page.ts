import { Component } from '@angular/core';
import {
  StructureNode,
  projectStructureIntro,
  projectTree,
  structureCli,
  structureLifecycle,
  structureMistakes,
} from '../../data/project-structure.data';
import { CodeBlockComponent } from '../../shared/components/code-block.component';

interface TocItem {
  id: string;
  name: string;
  kind: 'dir' | 'file';
  depth: number;
}

@Component({
  selector: 'app-structure-page',
  imports: [CodeBlockComponent],
  templateUrl: './structure.page.html',
  styleUrl: './structure.page.scss',
})
export class StructurePage {
  readonly intro = projectStructureIntro;
  readonly lifecycle = structureLifecycle;
  readonly cli = structureCli;
  readonly mistakes = structureMistakes;
  readonly toc: TocItem[] = this.toToc(projectTree);
  readonly files: StructureNode[] = this.flatten(projectTree);

  private toToc(nodes: StructureNode[], depth = 0, acc: TocItem[] = []): TocItem[] {
    for (const node of nodes) {
      acc.push({ id: node.id, name: node.name, kind: node.kind, depth });
      if (node.children?.length) {
        this.toToc(node.children, depth + 1, acc);
      }
    }
    return acc;
  }

  private flatten(nodes: StructureNode[], acc: StructureNode[] = []): StructureNode[] {
    for (const node of nodes) {
      acc.push(node);
      if (node.children?.length) {
        this.flatten(node.children, acc);
      }
    }
    return acc;
  }
}

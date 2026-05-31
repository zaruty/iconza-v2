"use server";

import { requireCmsEditor } from "@/app/lib/admin/require-admin";
import { createClient } from "@/app/lib/supabase/server";
import {
  assertSectionSchemaVersion,
  parseSectionProps,
  serializeSectionProps,
} from "../section-schemas";
import type { HomeSectionType, SectionPropsMap } from "../types";

export type CmsActionResult =
  | { success: true }
  | { success: false; error: string };

export async function updateHomeSectionProps<T extends HomeSectionType>(
  type: T,
  props: SectionPropsMap[T],
  schemaVersion = 1,
): Promise<CmsActionResult> {
  try {
    await requireCmsEditor();
    assertSectionSchemaVersion(schemaVersion);

    const supabase = await createClient();
    const serialized = serializeSectionProps(props);

    const { error } = await supabase
      .from("home_sections")
      .update({
        props_json: serialized,
        schema_version: schemaVersion,
      })
      .eq("type", type);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao salvar seção.";
    return { success: false, error: message };
  }
}

export async function reorderHomeSections(
  orderedTypes: HomeSectionType[],
): Promise<CmsActionResult> {
  try {
    await requireCmsEditor();

    const supabase = await createClient();

    for (let index = 0; index < orderedTypes.length; index++) {
      const type = orderedTypes[index];
      const { error } = await supabase
        .from("home_sections")
        .update({ order_index: index })
        .eq("type", type);

      if (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao reordenar seções.";
    return { success: false, error: message };
  }
}

export async function setHomeSectionVisibility(
  type: HomeSectionType,
  visible: boolean,
): Promise<CmsActionResult> {
  try {
    await requireCmsEditor();

    const supabase = await createClient();
    const { error } = await supabase
      .from("home_sections")
      .update({ visible })
      .eq("type", type);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao atualizar visibilidade.";
    return { success: false, error: message };
  }
}

export async function validateSectionProps<T extends HomeSectionType>(
  type: T,
  raw: unknown,
): Promise<SectionPropsMap[T]> {
  return parseSectionProps(type, raw);
}

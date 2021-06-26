export type JsonValue = string | number | boolean | Date | JsonObject | JsonArray | null

export interface JsonObject {
  [x: string]: JsonValue
}
export interface JsonArray extends Array<JsonValue> {}

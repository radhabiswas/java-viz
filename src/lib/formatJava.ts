import prettier from 'prettier';
import javaPlugin from 'prettier-plugin-java';

/**
 * Pretty-print Java using Prettier (prettier-plugin-java).
 * Throws if the source is not parseable as valid Java.
 */
export async function formatJavaCode(source: string): Promise<string> {
  const input = source.replace(/\r\n/g, '\n');
  try {
    const formatted = await prettier.format(input, {
      parser: 'java',
      plugins: [javaPlugin],
      tabWidth: 2,
    });
    // prettier-plugin-java often emits paired hardlines (blank lines) between class members and
    // similar nodes; for lesson/snippet editors that reads as an extra newline after every line.
    return formatted.replace(/(?:\r?\n){2,}/g, '\n');
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Could not format Java (check syntax — one public top-level class per file, balanced braces). ${msg}`,
    );
  }
}

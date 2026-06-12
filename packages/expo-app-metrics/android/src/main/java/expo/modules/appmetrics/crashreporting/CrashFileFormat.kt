package expo.modules.appmetrics.crashreporting

/**
 * The on-disk contract for pending-crash files, shared by [CrashFileWriter] (which emits it on the
 * crash path) and [CrashFileReader] (which parses it back on the next launch). Keeping the format in
 * one place means the writer and reader can't drift apart on the separator or the escaping rules.
 *
 * A file is a few `key=value` header lines, a [HEADER_SEPARATOR] line, then one escaped stack frame
 * per line. Header values are single-line by construction; messages can contain newlines (cause
 * chains) and `=`, so values are escaped while keys are not.
 */
internal object CrashFileFormat {
  /** Separates the `key=value` header block from the stack frames below it. */
  const val HEADER_SEPARATOR = "---"

  /** Suffix of the temp file the writer renames from, so a half-written file is never matched. */
  const val TEMP_SUFFIX = ".tmp"

  /** Matches a finished pending-crash file (`crash-{pid}-{timestamp}.txt`); skips `.tmp` by design. */
  val FILE_NAME_PATTERN = Regex("""crash-\d+-\d+\.txt""")

  fun escape(value: String): String =
    value.replace("\\", "\\\\").replace("\n", "\\n").replace("\r", "\\r")

  fun unescape(value: String): String {
    val result = StringBuilder(value.length)
    var index = 0
    while (index < value.length) {
      val char = value[index]
      if (char == '\\' && index + 1 < value.length) {
        val next = value[index + 1]
        val unescaped = when (next) {
          'n' -> '\n'
          'r' -> '\r'
          '\\' -> '\\'
          else -> null
        }
        if (unescaped != null) {
          result.append(unescaped)
          index += 2
          continue
        }
      }
      result.append(char)
      index++
    }
    return result.toString()
  }
}

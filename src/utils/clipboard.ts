/**
 * Copy text to the clipboard with a fallback for browsers where the async
 * Clipboard API is unavailable (for example, non-secure contexts).
 */
export async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();

  const execCommand = (document as unknown as { execCommand?: (command: string) => boolean })
    .execCommand;

  try {
    execCommand?.call(document, 'copy');
  } finally {
    field.remove();
  }
}

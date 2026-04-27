interface Props {
  text: string;
}

const renderInline = (line: string) => {
  // Bold: **text**
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const FormattedDescription = ({ text }: Props) => {
  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
      {blocks.map((block, idx) => {
        const lines = block.split("\n");
        // Heading block: starts with "## "
        if (lines[0].startsWith("## ")) {
          const heading = lines[0].replace(/^##\s+/, "");
          const rest = lines.slice(1);
          return (
            <div key={idx}>
              <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-2 uppercase tracking-tight">
                {renderInline(heading)}
              </h3>
              {rest.length > 0 && <BlockBody lines={rest} />}
            </div>
          );
        }
        return <BlockBody key={idx} lines={lines} />;
      })}
    </div>
  );
};

const BlockBody = ({ lines }: { lines: string[] }) => {
  const isList = lines.every((l) => /^[•✓\-]\s/.test(l) || l.trim() === "");
  if (isList) {
    return (
      <ul className="space-y-1.5">
        {lines.filter(Boolean).map((l, i) => {
          const marker = l.charAt(0);
          const content = l.replace(/^[•✓\-]\s+/, "");
          return (
            <li key={i} className="flex gap-2">
              <span className={marker === "✓" ? "text-primary font-bold" : "text-muted-foreground"}>{marker}</span>
              <span>{renderInline(content)}</span>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="space-y-2">
      {lines.map((l, i) => (
        <p key={i}>{renderInline(l)}</p>
      ))}
    </div>
  );
};

export default FormattedDescription;

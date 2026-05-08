import { Badge, type BadgeTone, Body, Card, Heading, Screen } from '@/components/ui';

export type PlaceholderScreenProps = {
  title: string;
  description: string;
  accent?: BadgeTone;
};

export function PlaceholderScreen({
  title,
  description,
  accent = 'primary',
}: PlaceholderScreenProps) {
  return (
    <Screen center>
      <Card>
        <Badge tone={accent}>Placeholder</Badge>
        <Heading className="mb-2 mt-4">{title}</Heading>
        <Body tone="muted">{description}</Body>
      </Card>
    </Screen>
  );
}

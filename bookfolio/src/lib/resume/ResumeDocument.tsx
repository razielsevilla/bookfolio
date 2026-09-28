import type { ReactNode } from 'react';
import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';

export interface ResumeExperienceEntry {
  title: string;
  organization?: string;
  yearRange: string;
  bullets?: string[];
}

export interface ResumeActivityEntry {
  title: string;
  organization?: string;
  dateRange: string;
  bullets?: string[];
}

export interface ResumeEducationEntry {
  institution: string;
  dateRange: string;
  programs?: string[];
}

export interface ResumeSkillEntry {
  name: string;
  description?: string;
}

export interface ResumeSocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface ResumeData {
  name: string;
  location?: string;
  email?: string;
  phone?: string;
  portfolioUrl?: string;
  socials: ResumeSocialLink[];
  experience: ResumeExperienceEntry[];
  activities: ResumeActivityEntry[];
  education: ResumeEducationEntry[];
  skills: ResumeSkillEntry[];
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 54,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#111111',
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 9.5,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  link: {
    color: '#111111',
    textDecoration: 'none',
  },
  sectionHeading: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
    paddingBottom: 2,
    marginTop: 14,
    marginBottom: 6,
  },
  entry: {
    marginBottom: 8,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  italic: {
    fontFamily: 'Times-Italic',
  },
  orgLine: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    marginTop: 1,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletGlyph: {
    width: 12,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 1.3,
  },
  skillLine: {
    fontSize: 10,
    marginBottom: 3,
  },
});

function EntryBlock({
  title,
  organization,
  dateRange,
  bullets,
}: {
  title: string;
  organization?: string;
  dateRange: string;
  bullets?: string[];
}) {
  return (
    <View style={styles.entry} wrap={false}>
      <Text>
        <Text style={styles.bold}>{title}</Text>
        <Text>{', '}</Text>
        <Text style={styles.italic}>{dateRange}</Text>
      </Text>
      {organization && <Text style={styles.orgLine}>{organization}</Text>}
      {bullets?.map((bullet, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletGlyph}>{'•'}</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </View>
  );
}

function EducationBlock({ institution, dateRange, programs }: ResumeEducationEntry) {
  return (
    <View style={styles.entry} wrap={false}>
      <Text>
        <Text style={styles.bold}>{institution}</Text>
        <Text>{'  '}</Text>
        <Text style={styles.italic}>{dateRange}</Text>
      </Text>
      {programs?.map((program, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletGlyph}>{'•'}</Text>
          <Text style={styles.bulletText}>{program}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ResumeDocument({ data }: { data: ResumeData }) {
  const contactChildren: ReactNode[] = [];
  const pushContact = (text: string, href?: string) => {
    if (contactChildren.length > 0) contactChildren.push('   |   ');
    contactChildren.push(
      href ? (
        <Link key={contactChildren.length} src={href} style={styles.link}>
          {text}
        </Link>
      ) : (
        text
      )
    );
  };

  if (data.location) pushContact(data.location);
  if (data.email) pushContact(data.email, `mailto:${data.email}`);
  if (data.phone) pushContact(data.phone);
  if (data.portfolioUrl) pushContact('Portfolio', data.portfolioUrl);
  data.socials
    .filter(s => s.platform === 'linkedin' || s.platform === 'github')
    .forEach(s => pushContact(s.label || (s.platform === 'linkedin' ? 'LinkedIn' : 'GitHub'), s.url));

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        {contactChildren.length > 0 && <Text style={styles.contactLine}>{contactChildren}</Text>}

        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Skills</Text>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillLine}>
                <Text style={styles.bold}>{skill.name}:</Text> {skill.description}
              </Text>
            ))}
          </>
        )}

        {data.experience.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Experience</Text>
            {data.experience.map((entry, i) => (
              <EntryBlock
                key={i}
                title={entry.title}
                organization={entry.organization}
                dateRange={entry.yearRange}
                bullets={entry.bullets}
              />
            ))}
          </>
        )}

        {data.activities.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Activities</Text>
            {data.activities.map((entry, i) => (
              <EntryBlock
                key={i}
                title={entry.title}
                organization={entry.organization}
                dateRange={entry.dateRange}
                bullets={entry.bullets}
              />
            ))}
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Education</Text>
            {data.education.map((entry, i) => (
              <EducationBlock key={i} {...entry} />
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}

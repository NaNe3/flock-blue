import { useState } from 'react';
import BasicInput from '../BasicInput';
import BasicButton from '../BasicButton';
import { supabase } from '../../utility/supabase';

export default function InsertPlanItemsByPlanId({ planId }) {
  const [work, setWork] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verses, setVerses] = useState('');
  const [time, setTime] = useState(2);
  const [dateDue, setDateDue] = useState('2026-01-12');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!chapter || !dateDue || !planId) {
      alert('Please fill in all fields: ');
      return;
    }

    setIsLoading(true);

    const localDate = new Date(`${dateDue} 23:59:00+00`);
    const utcDateString = localDate.toISOString();


    try {
      const { data, error } = await supabase
        .from('plan_item')
        .insert([{
          work,
          book,
          chapter,
          verses: verses === '' ? null : verses,
          time: parseInt(time),
          date_due: utcDateString,
          plan_id: planId,
        }]);

      if (error) {
        console.error('Error inserting plan item:', error);
        alert('Error creating plan item');
      } else {
        alert('Plan item created successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    const calculatedWeek = Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);
    return date.getDay() === 0 ? calculatedWeek - 1 : calculatedWeek;
  };

  const workOptions = [
    { value: '', label: 'Select Work...' },
    { value: 'Book Of Mormon', label: 'Book Of Mormon' },
    { value: 'Doctrine And Covenants', label: 'Doctrine And Covenants' },
    { value: 'Pearl Of Great Price', label: 'Pearl Of Great Price' },
    { value: 'Old Testament', label: 'Old Testament' },
    { value: 'New Testament', label: 'New Testament' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 style={styles.title}>Add New Plan Item</h3>

        <div style={styles.inputWrapper}>
          <select
            value={work}
            onChange={(e) => setWork(e.target.value)}
            style={styles.select}
          >
            {workOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <BasicInput
          value={book}
          setValue={setBook}
          placeholder="Book"
          style={styles.inputWrapper}
        />
        
        <BasicInput
          value={chapter}
          setValue={setChapter}
          placeholder="Chapter (e.g., 1 Nephi 3)"
          style={styles.inputWrapper}
        />

        <BasicInput
          value={verses}
          setValue={setVerses}
          placeholder="Verses (e.g., 1-10 or 5,8,12-15)"
          style={styles.inputWrapper}
        />

        <BasicInput
          value={time}
          setValue={setTime}
          placeholder="Time (e.g., 2)"
          style={styles.inputWrapper}
        />

        <BasicInput
          value={dateDue}
          setValue={setDateDue}
          placeholder="Due Date (YYYY-MM-DD)"
          style={styles.inputWrapper}
        />

        <BasicButton
          text={isLoading ? "Creating..." : "Create Plan Item"}
          onClick={handleSubmit}
          disabled={isLoading}
          style={styles.submitButton}
          color="#0ba3ff"
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 20,
    borderRadius: 8,
    margin: '20px 0'
  },
  formContainer: {
    maxWidth: 400,
    margin: '0 auto'
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 20,
    color: '#aaa',
    textAlign: 'center'
  },
  inputWrapper: {
    marginBottom: 15
  },
  submitButton: {
    width: '100%',
    marginTop: 10
  }
}

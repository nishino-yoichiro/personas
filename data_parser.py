import re
import os
import pandas as pd

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Define regex patterns to extract the relevant sections
    time_pattern = r'(\d{1,2}:\d{2}(?:[ap]m)?)'
    sleep_pattern = re.compile(rf'## Previous Day Sleep → {time_pattern}')
    wake_pattern = re.compile(rf'## Wake up → {time_pattern}')
    score_pattern = re.compile(r'## Score → (\d+/\d+)')
    event_pattern = re.compile(r'# (.+)')
    todo_pattern = re.compile(r'## To-do\n\n((?:- \[.\] .+\n)+)')
    good_pattern = re.compile(r'### What was good today\?\n\n((?:- .+\n)+)')
    better_pattern = re.compile(r'### What could we have done better\?\n\n((?:- .+\n)+)')
    strategic_pattern = re.compile(r'### Strategic changes\? \(1-2\)\n\n((?:- .+\n)+)')
    
    # Extract the relevant sections
    sleep_match = sleep_pattern.search(content)
    wake_match = wake_pattern.search(content)
    score_match = score_pattern.search(content)
    event_match = event_pattern.search(content)
    todo_match = todo_pattern.search(content)
    good_match = good_pattern.search(content)
    better_match = better_pattern.search(content)
    strategic_match = strategic_pattern.search(content)
    
    sleep_time = sleep_match.group(1) if sleep_match else None
    wake_time = wake_match.group(1) if wake_match else None
    score = score_match.group(1) if score_match else None
    event = event_match.group(1) if event_match else None
    todo_list = todo_match.group(1).strip() if todo_match else None
    good_today = good_match.group(1).strip() if good_match else None
    better_today = better_match.group(1).strip() if better_match else None
    strategic_changes = strategic_match.group(1).strip() if strategic_match else None
    
    # Calculate to-do list completion rate
    if todo_list:
        total_tasks = len(re.findall(r'- \[.\]', todo_list))
        completed_tasks = len(re.findall(r'- \[x\]', todo_list))
        completion_rate = f"{completed_tasks}/{total_tasks}"
    else:
        completion_rate = None
    
    return {
        'Event': event,
        'To-do list': todo_list,
        'To-do list completion rate': completion_rate,
        'Sleep time': sleep_time,
        'Wake time': wake_time,
        'Score': score,
        'What was good today': good_today,
        'What could we have done better or Strategic changes': better_today or strategic_changes
    }

def parse_folder(folder_path):
    data = []
    file_count = 0
    for filename in os.listdir(folder_path):
        if filename.endswith('.md'):
            file_count += 1
            file_path = os.path.join(folder_path, filename)
            entry = parse_markdown(file_path)
            if entry['Event'] and entry['To-do list']:
                data.append(entry)
    print(f"Processed {file_count} files.")
    return pd.DataFrame(data)

def filter_entries(folder_path):
    df = parse_folder(folder_path)
    print(df)

    csv_file_path = 'journal_entries.csv'
    df.to_csv(csv_file_path, index=False)

def read_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)
    return df

def parse_completion_rate(rate):
    if rate is None:
        return None
    completed, total = map(int, rate.split('/'))
    return completed / total

def calculate_average_completion_rate(df):
    df['Completion Rate'] = df['To-do list completion rate'].apply(parse_completion_rate)
    average_completion_rate = df['Completion Rate'].mean()
    return average_completion_rate

# Example usage
# folder_path = 'notion_data'
# filter_entries(folder_path)
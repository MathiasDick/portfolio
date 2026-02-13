---
title: Bunpro Progress Updater
publishDate: 2024-11-09 17:00:00
img: /assets/bunpro_images/bunpro-updater.png
img_alt: A simple GUI interface with vocabulary lists
description: |
  A PySide6 desktop application that automates vocabulary mastery on Bunpro. It integrates with Wanikani and Anki to sync language learning progress across platforms using Selenium web automation.
tags:
  - Software
  - Python
  - Automation
  - Desktop App
  - Selenium
  - PySide6
---

**Bunpro Progress Updater** is a desktop application designed to help Japanese language learners efficiently master vocabulary on the **Bunpro** platform. It solves the problem of manual data entry by automating the "mastery" process for vocabulary learned on other platforms like **Wanikani** and **Anki**.

## Key Features

- **Multi-Source Import**: 
  - Direct API integration with **Wanikani** to fetch learned vocabulary.
  - File parsing for **Anki** text exports.
- **Web Automation**: Uses **Selenium** to log in to Bunpro and interact with the web interface just like a human user, marking items as mastered.
- **Desktop GUI**: A clean **PySide6 (Qt)** interface that separates the complex automation logic from the user experience.
- **Progress Tracking**: Allows filtering by JLPT levels (N5-N1) to target specific study goals.

## Tech Stack

This project demonstrates proficiency in:
- **Python**: Core logic and application structure.
- **PySide6**: Building responsive desktop GUIs.
- **Selenium**: Advanced browser automation for sites without public write APIs.
- **Pandas**: Data manipulation and vocabulary list processing.
- **REST APIs**: Consuming the Wanikani API.

## Challenges & Solutions

- **Recursive Page Navigation**: The application uses a recursive crawling algorithm to navigate through pagination on Bunpro decks. This ensures that as the bot masters items, it correctly processes dynamic page structures without missing items.
- **Robust Data Parsing**: User-generated Anki decks often contain inconsistent formatting. I implemented a custom Regular Expression (RegEx) parser to strip out metadata, formatting tags, and noise, extracting only the pure vocabulary terms needed for matching.
- **Dynamic DOM Interaction**: Bunpro's modern web interface relies heavily on JavaScript. The automation script handles complex states—like dropdown menus that only appear on interaction—using intelligent explicit waits to ensure stability across different network speeds.

## How it works

The application functions as a bridge between your "knowledge" sources and your "practice" destination.

1.  **Ingestion**: It builds a normalized list of "known words" by hitting the Wanikani API or parsing local Anki text exports.
2.  **Authentication**: It launches a controlled browser instance to securely log in to the Bunpro dashboard.
3.  **Crawling**: Based on selected JLPT levels (e.g., N5, N4), the bot navigates to specific decks.
4.  **Matching & Action**: It iterates through every card. If a word matches your "known" list and hasn't been mastered yet, the bot automatically triggers the specific UI interactions to "Mark as Mastered," saving thousands of manual clicks.

## Key Code Snippet

The following snippet demonstrates the recursive logic used to navigate through deck pagination. This approach was chosen over a simple loop to better handle dynamic page loading and potential network interruptions during long execution times.

```python
def edit_deck(self, page, stop_page, deck):
    """Navigates through deck pages recursively to mark vocabulary as mastered"""
    try:
        self.driver.get(f"https://bunpro.jp/decks/{deck}?page={str(page)}")
        
        # Intelligent wait for deck cards to populate
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "deck-info-card"))
        )

        # ... (logic to process vocabulary items on current page) ...

        # Recursive call to process the next page
        if page < stop_page:
            self.edit_deck(page + 1, stop_page, deck)
            
    except (NoSuchElementException, TimeoutException) as e:
        logging.error("Failed to process page %d: %s", page, e)
```

> "A tool that automates login and vocabulary updates on Bunpro, saving users significant time and effort."

[View Source on GitHub](https://github.com/MathiasDick/Bunpro-Progress-Updater)

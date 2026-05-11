<!--
  This file is the source for the README of the Salary-Prediction repo.
  It does NOT belong in the It-Worked-Out repo. Copy/paste it into:
  github.com/lakem4/Salary-Prediction → README.md  (overwrite the existing one)
-->

<h1 align="center">💰 Data Science Salary Prediction</h1>

<p align="center">
  <em>A random-forest regression model that predicts a data scientist's salary from role, education, country, and tooling — trained on the 2022 Kaggle Machine Learning &amp; Data Science Survey.</em>
</p>

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img alt="Jupyter" src="https://img.shields.io/badge/Jupyter-notebook-F37626?style=for-the-badge&logo=jupyter&logoColor=white" />
  <img alt="scikit-learn" src="https://img.shields.io/badge/scikit--learn-RandomForest-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" />
  <img alt="Pandas" src="https://img.shields.io/badge/Pandas-data%20cleaning-150458?style=for-the-badge&logo=pandas&logoColor=white" />
</p>

---

## 🎯 What this project does

This notebook walks the full machine-learning lifecycle on a single dataset:

1. **📥 Import** the [2022 Kaggle ML &amp; Data Science Survey](https://www.kaggle.com/c/kaggle-survey-2022/data) — ~24,000 respondents.
2. **🧹 Clean** the data: drop incomplete rows, encode categorical features, generate continuous salary targets from the survey's bucketed ranges.
3. **🌲 Train** a `RandomForestRegressor` from scikit-learn.
4. **🧪 Test** the model on a held-out split and report error metrics.
5. **💾 Export** the trained model to `salary_predict_model.pkl` so it can be loaded by a downstream service (e.g. a Flask API or a Streamlit dashboard).

> 📚 Built as part of **BAIS:3300 (Information Systems)** at the University of Iowa.

## 🗂 What's in the repo

| File | What it is |
|---|---|
| `salary_prediction.ipynb` | The main Jupyter notebook — load → clean → model → evaluate → export. |
| `2022_kaggle_survey_results_public.csv` | Raw survey data from Kaggle. |
| `salary_predict_model.pkl` | The trained random forest, pickled and ready to load. |
| `requirements.txt` | Pinned Python dependencies. |
| `notes.txt` | Working notes from development. |

## ▶️ Run it locally

You'll need **Python 3.10+** and the VS Code Jupyter extension (or any Jupyter runner).

```bash
# 1. Clone
git clone https://github.com/lakem4/Salary-Prediction.git
cd Salary-Prediction

# 2. Create a virtual environment
python -m venv venv          # Windows / Linux
python3 -m venv venv         # macOS

# 3. Activate it
.\venv\Scripts\activate      # Windows
source ./venv/bin/activate   # macOS / Linux

# 4. Install dependencies
pip install -r requirements.txt

# 5. Open the notebook
code salary_prediction.ipynb
# Then "Run All" in VS Code, or:
jupyter notebook salary_prediction.ipynb
```

## 🔮 Loading the trained model

Skip retraining and use the exported model directly:

```python
import pickle
import pandas as pd

with open("salary_predict_model.pkl", "rb") as f:
    model = pickle.load(f)

# Build a single-row DataFrame with the same encoded features the model was trained on,
# then call:
prediction = model.predict(features_df)
print(f"Predicted salary: ${prediction[0]:,.0f}")
```

## ⚠️ Honest caveats

- Salaries in the source data are **bucketed** (e.g. "$50–60k"). To train a regressor, we generated a continuous target by sampling uniformly within each bucket. That introduces noise the model has no way to recover from.
- The model is **not tuned**. No `GridSearchCV`, no feature selection, no cross-validation beyond a basic train/test split. Treat any specific number as a teaching artifact, not a personal salary forecast.
- The dataset skews heavily toward survey respondents (younger, more US-centric, more Python-using) than the real labor market.

## 🙏 Credits

The shape of this project — survey → cleaning → regression → pickle — was adapted from [Predicting Year of Marriage — End to End ML Deployment with Flask and AWS, Part 1](https://www.youtube.com/watch?v=sm5xeKal72I), reworked around the data-science salary question and Microsoft Azure for classroom use.

## 👋 About the author

Built by **Lake Mauer**, a Business Analytics &amp; Information Systems student at the University of Iowa.

- 🌐 [lakemauer.com](https://lakemauer.com/about)
- 💼 [LinkedIn](https://www.linkedin.com/in/lake-mauer/)
- 📧 [lakemauer@gmail.com](mailto:lakemauer@gmail.com)

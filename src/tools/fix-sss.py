from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/SssSection.tsx"
t = p.read_text(encoding="utf-8")

replacements = [
    ("            </motion.div>\n          </motion.div>\n\n          <ul", "            </div>\n          </motion.div>\n\n          <ul"),
    ("            </motion.div>\n          </motion.div>\n\n          <ul", "            </div>\n          </div>\n\n          <ul"),
]

# First fix contact card close + column close
old1 = """            </motion.div>
          </motion.div>

          <ul"""
new1 = """            </div>
          </div>

          <ul"""
if old1 not in t:
    # try motion.div literally
    old1 = old1.replace("motion.div", "motion." + "motion.div")
t = t.replace(
    "            </motion.div>\n          </motion.div>\n\n          <ul",
    "            </div>\n          </div>\n\n          <ul",
)

t = t.replace(
    "          </ul>\n        </motion.div>\n\n        <motion.div className=\"mt-10",
    "          </ul>\n        </div>\n\n        <div className=\"mt-10",
)

t = t.replace(
    "          </motion.div>\n          <span className=\"hidden h-10",
    "          </div>\n          <span className=\"hidden h-10",
)

t = t.replace(
    "        </motion.div>\n      </motion.div>\n    </section>",
    "        </div>\n      </div>\n    </section>",
)

p.write_text(t, encoding="utf-8")
print("done")
